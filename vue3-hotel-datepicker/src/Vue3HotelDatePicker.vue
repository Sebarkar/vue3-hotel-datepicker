<script setup lang="ts">
import * as fecha from "fecha";

const props = defineProps({
  format: {
    default: "YYYY-MM-DD",
    type: String,
  },
  startOfWeek: {
    default: 'monday',
    type: String,
  },
  separator: {
    default: "-",
    type: String,
  },
  selectedDates: false,
  startDate: false,
  endDate: {
    default: false,
    type: [String, Boolean],
  },
  minDate: {
    default: () => new Date(),
  }, // The start view date. All the dates before this date will be disabled.
  maxDate: false, // The end view date. All the dates after this date will be disabled.
  disabledDaysOfWeek: {
    default: () => []
  },
  showTopbar: false,
  moveBothMonths: false,
  ariaDayFormat: "dddd, MMMM DD, YYYY",
  noCheckOutDates: {
    default: () => []
  },
  noCheckInDates: {
    default: () => []
  },
  noCheckInDaysOfWeek: {
    default: () => []
  },
  noCheckOutDaysOfWeek: {
    default: () => []
  },
  maxNights: 0,
  minNights: 1,
  singleMonthBreakpoint: {
    default: false,
    type: [Number, Boolean],
  },
  topbarPosition: "top",
  onOpenDatepicker: Boolean,
  minNightsMultiple: Boolean,
  selectForward: Boolean,
  showSingleMonth: Boolean,
  disabledDates: {
    default: false,
    type: [Array, Boolean]
  },
  daysWithExtraText: {
    default: () => []
  },
  enableCheckout: Boolean,
  getValues: null,
  extraDayText: null,
  i18n: {
    default: () => {
      return {
        selected: "Your stay:",
        night: "Night",
        nights: "Nights",
        button: "Close",
        clearButton: "Clear",
        submitButton: "Submit",
        "checkin-disabled": "Check-in disabled",
        "checkout-disabled": "Check-out disabled",
        "day-names-short": ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
        "day-names": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "month-names-short": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        "month-names": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "error-more": "Date range should not be more than 1 night",
        "error-more-plural": "Date range should not be more than %d nights",
        "error-less": "Date range should not be less than 1 night",
        "error-less-plural": "Date range should not be less than %d nights",
        "not selected": "Not selected",
        "info-more": "Please select a date range of at least 1 night",
        "info-more-plural": "Please select a date range of at least %d nights",
        "info-range": "Please select a date range between %d and %d nights",
        "info-range-equal": "Please select a date range of %d nights",
        "info-default": "Please select a date range",
        "aria-application": "Calendar",
        "aria-selected-checkin": "Selected as check-in date, %s",
        "aria-selected-checkout": "Selected as check-out date, %s",
        "aria-selected": "Selected, %s",
        "aria-disabled": "Not available, %s",
        "aria-choose-checkin": "Choose %s as your check-in date",
        "aria-choose-checkout": "Choose %s as your check-out date",
        "aria-prev-month": "Move backward to switch to the previous month",
        "aria-next-month": "Move forward to switch to the next month",
        "aria-close-button": "Close the datepicker",
        "aria-clear-button": "Clear the selected dates",
        "aria-submit-button": "Submit the form"
      }
    }
  },
})

const setValue = (s) => {
  input.value = s;
}

const setFechaI18n = () => {
  fecha.setGlobalDateI18n({
    dayNamesShort: props.i18n["day-names-short"],
    dayNames: props.i18n["day-names"],
    monthNamesShort: props.i18n["month-names-short"],
    monthNames: props.i18n["month-names"]
  });
}

const emits = defineEmits({
  select: (e: { start: number, end: number }) => true
})

const getValuesLocal = () => {
  if (props.getValues) {
    return props.getValues();
  }
  if (props.separator) {
    return;
  }
  return input.value
}
// Hide tooltip on touch devices
const inline = ref(true);
const hoveringTooltip = ref(false);
// Flag that checks if the datepicker is open
const isOpen = ref(false);
// Flag that checks if the second date of the range is set
const changed = ref(false);
// Flag that checks if we exit from the datepicker with the ESC key
const justEsc = ref(false);
// Flag that checks if we datepicker is on focus
const isOnFocus = ref(false);
const maxDays = ref(props.maxNights)
const minDays = ref(props.minNights)
// Start date of the selected range
const start = ref(props.startDate ?? false);
// End date of the selected range
const end = ref(props.endDate ?? false);
const input = ref(null);
// Store last disabled date for later
const lastDisabledDate = ref(null);
const daysWithExtraText = ref([]);
// Store the datepicker month object for later
const months: any = ref({});
const isFirstDisabledDate = ref(0);
const submitButton = ref(null);
const clearButton = ref(null);
const onOpenDatepicker = ref(props.onOpenDatepicker ?? props.onOpenDatepicker);
// Flag that checks if the datepicker is open
isOpen.value = false;
// Flag that checks if the second date of the range is set
changed.value = false;
// Flag that checks if we exit from the datepicker with the ESC key
justEsc.value = false;
// Flag that checks if we datepicker is on focus
isOnFocus.value = false;
const startDateInstance = ref(props.startDate);
const endDateInstance = ref(props.endDate);
const disabledDatesTime = ref([]);

const selectedDatesTmp = ref({
  start: null,
  end: null,
});

const datePickerObject = ref({
  months: [],
  open: true,
  submitButton: false,
  clearButton: false,
  showSingleMonth: props.showSingleMonth,
});
const topBar = computed({
  error: false,
  textContent: '',
  show: false,
});
const getWeekDayNames = () => {
  let week = [];

  // Start from monday if we passed that option
  if (props.startOfWeek === "monday") {
    for (let i = 0; i < 7; i++) {
      week.push(lang("day-names-short")[(1 + i) % 7]);
    }
    return week;
  }

  // Otherwise start from sunday (default)
  for (let i = 0; i < 7; i++) {
    week.push(lang("day-names-short")[i]);
  }
  return week;
}

const getMonthName = (m: Number) => {
  // Get month name
  return lang("month-names")[m];
}

const getNextMonth = (month) => {
  // Get next month date
  const _m = new Date(month.valueOf());
  return new Date(_m.setMonth(_m.getMonth() + 1, 1));
}

const getPrevMonth = (month) => {
  // Get previous month date
  const _m = new Date(month.valueOf());
  return new Date(_m.setMonth(_m.getMonth() - 1, 1));
}

const getDateString = (date, formating = null) => {
  let format = formating ?? props.format;
  // Format date
  setFechaI18n();
  return fecha.format(date, format);
}
const parseDate = (date, formating = null) => {
  let format = formating ?? props.format;
  // Parse a date object
  setFechaI18n();
  return fecha.parse(date, format);
}
const init = () => {
  // Set the minimum of days required by the daterange
  minDays.value = props.minNights > 1 ? props.minNights + 1 : 2;

  // Set the maximum of days required by the daterange
  maxDays.value = props.maxNights > 0 ? props.maxNights + 1 : 0;
  // Set startDate if we passed that option
  if (props.startDate && typeof props.startDate === "string") {
    startDateInstance.value = parseDate(props.startDate);
  }

  // Set endDate if we passed that option
  if (props.endDate && typeof props.endDate === "string") {
    endDateInstance.value = parseDate(endDateInstance.value);
  }

  // Parse disabled dates
  if (props.disabledDates.length > 0) {
    parseDisabledDates();
  }

  // Parse disabled days
  if (props.disabledDaysOfWeek.length > 0) {
    getDisabledDays();
  }

  if (startDateInstance.value && endDateInstance.value) {
    // Set the date range
    setRange(startDateInstance.value, endDateInstance.value);
  } else {
    noSelectionBuild(); // mutate datePickerObject
  }

  if (clearButton.value) {
    if (inline.value || !start.value && !end.value) {
      datePickerObject.value.clearButton = true;
    }
  }

  // Flag for first disabled date
  isFirstDisabledDate.value = 0;

  // Holds last disabled date
  lastDisabledDate.value = false;
}
const addMonth = (date, month) => {
  //Avoid mutating properties in original Date Object by linking it to the new object
  date = new Date(date);
  let monthInstance: any = {
    name: getMonthName(date.getMonth()),
    month: date.getMonth(),
    year: date.getFullYear(),
    id: date.getFullYear() + date.getMonth(),
    days: [],
    nextBtn: true,
    prevBtn: true,
  }
  date.setHours(0, 0, 0, 0);

  // Show month table and create the necessary HTML code
  monthInstance.days = createMonthObject(date)
  // Append the month
  datePickerObject.value.months.splice(month - 1, 1, monthInstance);

  // Check day dates
  updateSelectableRange();

  // Store current month dates
  months.value["month" + month] = date;
}
const createMonthObject = (_date: Date) => {
  const days = [];
  const result = [];
  let valid;
  _date.setDate(1);
  let dayOfWeek = _date.getDay();
  const currentMonth = _date.getMonth();
  if (dayOfWeek === 0 && props.startOfWeek === "monday") {
    // Add one week
    dayOfWeek = 7;
  }

  // If the first day is in the middle of the week, push also
  // the first days of the week (the days before our first day).
  // We need a complete week row.
  // Obviously, these days are part of the previous month.
  if (dayOfWeek > 0) {
    for (let i = dayOfWeek; i > 0; i--) {
      const _day = new Date(_date.getTime() - 86400000 * i);

      // Check if the day is valid. And pass this property to the days object
      valid = isValidDate(_day.getTime());
      if (props.minDate && compareDay(_day, props.minDate) < 0 || props.maxDate && compareDay(_day, props.maxDate) > 0) {
        valid = false;
      }

      // We pass the type property to know if the day is part of the
      // previous month. We already know that it is true.
      days.push({
        date: _day,
        type: "lastMonth",
        day: _day.getDate(),
        time: _day.getTime(),
        tabindex: 0,
        attributes: [],
        isNoCheckOut: false,
        isValid: valid,
        isNoCheckIn: false,
        isCurrentMonth: false,
      });
    }
  }

  // Push 40 days. Each month table needs the days of the month plus
  // the remaining days (of the week row) before the first day of the month
  // and after the last day of the month. (PS. They will be hidden)
  // 40 days are enough to cover all the possibilities.
  for (let i = 0; i < 40; i++) {
    const _day = addDays(_date, i);

    // Check if the day is valid. And pass this property to the days object
    valid = isValidDate(_day.getTime());
    if (props.minDate && compareDay(_day, props.minDate) < 0 || props.maxDate && compareDay(_day, props.maxDate) > 0) {
      valid = false;
    }

    // We pass the type property to know if the day is part of the
    // current month or part of the next month
    days.push({
      date: _day,
      type: _day.getMonth() === currentMonth ? "visibleMonth" : "nextMonth",
      day: _day.getDate(),
      time: _day.getTime(),
      tabindex: 0,
      attributes: [],
      isCurrentMonth: _day.getMonth() === currentMonth,
      isValid: valid,
      isNoCheckIn: false,
      isNoCheckOut: false,
    });
  }

  // Create the week rows.
  for (let week = 0; week < 6; week++) {
    // Iterate the days object week by week.
    // If the last day is part of the next month, stop the loop.
    if (days[week * 7].type === "nextMonth") {
      break;
    }

    // Create the days of a week, one by one
    for (let i = 0; i < 7; i++) {
      let _day = props.startOfWeek === "monday" ? i + 1 : i;
      _day = days[week * 7 + _day];
      result.push(fillDayState(_day));
    }
  }

  return result;
}
const fillDayState = (_day) => {
  const isToday = getDateString(_day.time) === getDateString(new Date());
  const isStartDate = getDateString(_day.time) === getDateString(props.minDate);
  const isDayWithExtraText = props.daysWithExtraText.indexOf(getDateString(_day.time)) > -1;
  let isDisabled = false;
  let isNoCheckIn = false;
  let isNoCheckOut = false;
  let isDayOfWeekDisabled = false;
  let isFirstEnabledDate = false;

  // Day between disabled dates and the last day
  // before the disabled date
  let isDayBeforeDisabledDate = false;

  // Check if the day is one of the days passed in the
  // (optional) disabledDates option. And set valid to
  // false in this case.
  //
  // Also, check if the checkin or checkout is disabled
  if (_day.valid || _day.type === "visibleMonth") {
    const dateString = getDateString(_day.time, "YYYY-MM-DD");
    if (props.disabledDates.length > 0) {
      // Check if this day is between two disabled dates
      // and disable it if there are not enough days
      // available to select a valid range
      const limit = getClosestDisabledDates(_day.date);

      // Consider also the day before startDate
      // as disabled date
      if (limit[0] === false) {
        limit[0] = substractDays(startDateInstance.value, 1);
      }
      if (limit[0] && limit[1]) {
        if (compareDay(_day.date, limit[0]) && countDays(limit[0], limit[1]) - 2 > 0) {
          const daysBeforeNextDisabledDate = countDays(limit[1], _day.date) - 1;
          const daysAfterPrevDisabledDate = countDays(_day.date, limit[0]) - 1;
          if (props.selectForward && daysBeforeNextDisabledDate < minDays.value) {
            _day.isValid = false;
          } else if (!props.selectForward && daysBeforeNextDisabledDate < minDays.value && daysAfterPrevDisabledDate < minDays.value) {
            _day.isValid = false;
          }
          if (!_day.isValid && props.enableCheckout && daysBeforeNextDisabledDate === 2) {
            isDayBeforeDisabledDate = true;
          }
        }
      }
      if (props.disabledDates.indexOf(dateString) > -1) {
        _day.isValid = false;
        isDisabled = true;
        isFirstDisabledDate.value++;

        // Store last disabled date for later
        lastDisabledDate.value = _day.date;
      } else {
        isFirstDisabledDate.value = 0;
      }

      // First day after a disabled day
      if (_day.isValid && lastDisabledDate.value && compareDay(_day.date, lastDisabledDate.value) > 0 && countDays(_day.date, lastDisabledDate.value) === 2) {
        isFirstEnabledDate = true;
      }
    }
    if (props.disabledDaysOfWeek.length > 0) {
      if (props.disabledDaysOfWeek.indexOf(fecha.format(_day.time, "dddd")) > -1) {
        _day.isValid = false;
        isDayOfWeekDisabled = true;
      }
    }
    if (props.noCheckInDates.length > 0) {
      if (props.noCheckInDates.indexOf(dateString) > -1) {
        isNoCheckIn = true;
        isFirstEnabledDate = false;
      }
    }
    if (props.noCheckOutDates.length > 0) {
      if (props.noCheckOutDates.indexOf(dateString) > -1) {
        isNoCheckOut = true;
      }
    }
    if (props.noCheckInDaysOfWeek.length > 0) {
      if (props.noCheckInDaysOfWeek.indexOf(fecha.format(_day.time, "dddd")) > -1) {
        isNoCheckIn = true;
        isFirstEnabledDate = false;
      }
    }
    if (props.noCheckOutDaysOfWeek.length > 0) {
      if (props.noCheckOutDaysOfWeek.indexOf(fecha.format(_day.time, "dddd")) > -1) {
        isNoCheckOut = true;
      }
    }
  }

  _day.isToday = isToday
  _day.isDisabled = isDisabled
  _day.isCheckOutEnabled = isDisabled && props.enableCheckout && isFirstDisabledDate.value === 1
  _day.isDayBeforeDisabledDate = isDayBeforeDisabledDate
  _day.isCheckInOnly = isStartDate || isFirstEnabledDate
  _day.isNoCheckIn = isNoCheckIn
  _day.isNoCheckOut = isNoCheckOut
  _day.isDayOfWeekDisabled = isDayOfWeekDisabled
  _day.isDayWithExtraText = isDayWithExtraText

  return _day;
}
const checkAndSetDayClasses = () => {
  // Get every td in the months table: our days
  // Iterate each day and re-check HTML classes
  for (let i = 0; i < datePickerObject.value.months.length; i++) {
    for (let y = 0; y < datePickerObject.value.months[i].days.length; y++) {
      const time = parseInt(datePickerObject.value.months[i].days[y].time, 10);
      const day = new Date(time);
      let valid;

      // Check if the day is valid. And pass this property to the days object
      valid = isValidDate(day.getTime());
      if (props.minDate && compareDay(day, props.minDate) < 0 || props.maxDate && compareDay(day, props.maxDate) > 0) {
        valid = false;
      }
      datePickerObject.value.months[i].days[y].isValid = valid;
      datePickerObject.value.months[i].days[y] = fillDayState(datePickerObject.value.months[i].days[y]);
    }
  }
}
const noSelectionBuild = () => {
  addMonth(props.minDate, 1);
  addMonth(getNextMonth(props.minDate), 2);

  // Disable (if needed) the prev/next buttons
  disableNextPrevButtons();
}
const setDateRange = (date1, date2, ...arg) => {
  let onresize = arg.length > 0 && arg[0] !== undefined ? arg[0] : false;
  // Swap dates if needed
  if (date1.getTime() > date2.getTime()) {
    let tmp = date2;
    date2 = date1;
    date1 = tmp;
    tmp = null;
  }
  let valid = true;

  // Check the validity of the dates
  if (props.minDate && compareDay(date1, props.minDate) < 0 || props.maxDate && compareDay(date2, props.maxDate) > 0) {
    valid = false;
  }

  // If not valid, reset the datepicker
  if (!valid) {
    noSelectionBuild();
    return;
  }

  // Fix DST
  date1.setTime(date1.getTime() + 12 * 60 * 60 * 1000);
  date2.setTime(date2.getTime() + 12 * 60 * 60 * 1000);

  // Calculate the next month value
  start.value = date1.getTime();
  end.value = date2.getTime();
  if (compareDay(date1, date2) > 0 && compareMonth(date1, date2) === 0) {
    date2 = getNextMonth(date1);
  }
  if (compareMonth(date1, date2) === 0) {
    date2 = getNextMonth(date1);
  }

  // Add the months
  addMonth(date1, 1);
  addMonth(date2, 2);

  // Show selected days in the calendar
  updateSelectedDays();

  // Disable (if needed) the prev/next buttons
  disableNextPrevButtons();

  // Check the selection
  checkSelection();

  // Show selected dates in top bar
  showSelectedInfo();
}
const updateSelectedDays = () => {

  // Return early if we don't have the start and end dates
  if (!start.value && !end.value) {
    return;
  }

  // Iterate each day and assign an appropriate HTML class
  // if they are selected in the date range
  for (let i = 0; i < datePickerObject.value.months.length; i++) {
    for (let y = 0; y < datePickerObject.value.months[i].days.length; y++) {
      const newDay = datePickerObject.value.months[i].days[y];
      const time = parseInt(newDay.time, 10);

      // Change isSelected property
      if (start.value && end.value && end.value >= time && start.value <= time || start.value && !end.value && getDateString(start.value, "YYYY-MM-DD") === getDateString(time, "YYYY-MM-DD")) {
        newDay.isSelected = true;
      } else {
        newDay.isSelected = false;
      }

      // First day of the range
      if (start.value && getDateString(start.value, "YYYY-MM-DD") === getDateString(time, "YYYY-MM-DD")) {
        newDay.isFirstDaySelected = true;
      } else {
        newDay.isFirstDaySelected = false;
      }

      // Last day of the range
      if (end.value && getDateString(end.value, "YYYY-MM-DD") === getDateString(time, "YYYY-MM-DD")) {
        newDay.isLastDaySelected = true;
      } else {
        newDay.isLastDaySelected = false;
      }
      datePickerObject.value.months[i].days[y] = Object.assign({}, newDay)
    }
  }
}
const showSelectedInfo = () => {
  // Return early if the top bar is disabled
  if (!props.showTopbar) {
    // If both dates are set, set the value of our input
    if (start.value && end.value) {
      const dateRangeValue = getDateString(new Date(start.value)) + props.separator + getDateString(new Date(end.value));

      // Set input value
      setValue(dateRangeValue, getDateString(new Date(start.value)), getDateString(new Date(end.value)));
      changed.value = true;
    }
    return;
  }

  // Show selected dates in top bar
}
const dayClicked = (day, monthId) => {
  if (!day.isValid) {
    return;
  }
  const isSelectStart = selectedDatesTmp.value.start === null;
  const time = parseInt(day.time, 10);

  // Return if same day clicked. Prevent one day selection (logic for range selection only)
  if (selectedDatesTmp.value.start && selectedDatesTmp.value.start.day === day.day) {
    return;
  }

  // Return early for those days where the checkin or checkout is disabled
  if (isSelectStart) {
    if (day.isNoCheckIn) {
      return;
    }
  } else if (start.value) {
    if (start.value > time && day.isNoCheckIn) {
      return;
    }
    if (selectedDatesTmp.value.start) {
      if (selectedDatesTmp.value.start.isNoCheckIn && start.value > time) {
        return;
      }
    }
    if (day.isNoCheckOut && time > start.value) {
      return;
    }
  }

  if (isSelectStart) {
    selectedDatesTmp.value.start = day;
    start.value = time;
    end.value = false;
  } else if (start.value) {
    selectedDatesTmp.value.end = day;
    end.value = time;
    hidePopover();
  }

  // Swap dates if they are inverted
  if (start.value && end.value && start.value > end.value) {
    const tmp = end.value;
    end.value = start.value;
    start.value = tmp;
  }
  start.value = parseInt(start.value, 10);
  end.value = parseInt(end.value, 10);

  // Remove hovering class from every day and hide tooltip
  clearHovering();

  // Show hover
  if (start.value && !end.value) {
    // Add hovering class
    dayHovering(day);
  }
  // Check day dates
  updateSelectableRange();

  // Check the selection
  checkSelection();

  // Show selected dates in top bar
  showSelectedInfo();


  // Check dates again after selection
  if (start.value && end.value) {
    checkAndSetDayClasses();
  }

  // Show selected days in the calendar
  updateSelectedDays();


  // Handle event select pass properties outside
  if (end.value) {
    emits("select", {start: start.value, end: end.value});
  }

  selectedDatesTmp.value.end ? dropTmpValuesForSelection() : null;
}

const dropTmpValuesForSelection = () => {
  // Drop temporary values for selection
  selectedDatesTmp.value.start = null;
  selectedDatesTmp.value.end = null;
}
const isValidDate = (time) => {
  // Check if the date is valid
  time = parseInt(time, 10);
  if (props.minDate && compareDay(time, props.minDate) < 0 || props.maxDate && compareDay(time, props.maxDate) > 0) {
    return false;
  }
  // Update valid dates during the selection
  if (start.value && !end.value) {
    // Check maximum/minimum days

    if (maxDays.value > 0 && countDays(time, start.value) > maxDays.value || minDays.value > 0 && countDays(time, start.value) > 1 && countDays(time, start.value) < minDays.value) {
      return false;
    }
    // Check if only multiple of minDays is allowed
    if (props.minNightsMultiple && (countDays(time, start.value) - 1) % 7 !== 0) {
      return false;
    }

    // Check if date is before first date of range
    if (props.selectForward && time < start.value) {
      return false;
    }

    // Check the disabled dates
    if (props.disabledDates.length > 0) {
      const limit = getClosestDisabledDates(new Date(parseInt(start.value, 10)));
      if (limit[0] && compareDay(time, limit[0]) <= 0) {
        return false;
      }
      if (limit[1] && compareDay(time, limit[1]) >= 0) {
        return false;
      }
    }

    // Check disabled days of week
    if (props.disabledDaysOfWeek.length > 0) {
      const limit = getClosestDisabledDays(new Date(parseInt(start.value, 10)));
      if (limit[0] && compareDay(time, limit[0]) <= 0) {
        return false;
      }
      if (limit[1] && compareDay(time, limit[1]) >= 0) {
        return false;
      }
    }
  }
  return true;
}

const clearSelectedDates = () => {
  for (let i = 0; i < datePickerObject.value.months.length; i++) {
    for (let y = 0; y < datePickerObject.value.months[i].days.length; y++) {
      datePickerObject.value.months[i].days[y].selected = false;
      datePickerObject.value.months[i].days[y].isFirstDaySelected = false;
      datePickerObject.value.months[i].days[y].isLastDaySelected = false;
    }
  }
  return true;
}

const checkSelection = () => {
  const numberOfDays = countDays(end.value, start.value);
  if (maxDays.value && numberOfDays > maxDays.value) {
    start.value = false;
    end.value = false;

    // Remove selected class from each day

    clearSelectedDates();
    if (props.showTopbar) {
      // Show error in top bar
      const errorValue = maxDays.value - 1;
      topBar.value.error = errorValue;
    }
  } else if (minDays.value && numberOfDays < minDays.value) {
    start.value = false;
    end.value = false;

    // Remove selected class from each day
    clearSelectedDates();
    if (props.showTopbar) {
      // Show error in top bar
      const errorValue = minDays.value - 1;
      topBarErrorText(bar, "error-less", errorValue);
    }
  } else if (start.value || end.value) {
    if (props.showTopbar) {
      // Remove error and help classes from top bar
      topBar.value.error = ''
    }
  } else if (props.showTopbar) {
    // Show help message
    topBar.value.error = ''
  }
}
const addDays = (date, days) => {
  // Add xx days to date
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
const substractDays = (date, days) => {
  // Substract xx days to date
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}
const countDays = (start, end) => {
  // Return days between two dates
  return Math.abs(daysFrom1970(start) - daysFrom1970(end)) + 1;
}
const compareDay = (day1, day2) => {
  // Compare two days: check if day1 is before/after/same day of day2
  const p = parseInt(getDateString(day1, "YYYYMMDD"), 10) - parseInt(getDateString(day2, "YYYYMMDD"), 10);
  if (p > 0) {
    return 1;
  }
  if (p === 0) {
    return 0;
  }
  return -1;
}
const compareMonth = (month1, month2) => {
  // Compare two months: check if month1 is before/after/same month of month2
  const p = parseInt(getDateString(month1, "YYYYMM"), 10) - parseInt(getDateString(month2, "YYYYMM"), 10);
  if (p > 0) {
    return 1;
  }
  if (p === 0) {
    return 0;
  }
  return -1;
}
const daysFrom1970 = (t) => {
  // Get days from 1970
  return Math.round(toLocalTimestamp(t) / 86400000);
}
const toLocalTimestamp = (t) => {
  // Convert timestamp to local timestamp
  if (typeof t === "object" && t.getTime) {
    t = t.getTime();
  }
  if (typeof t === "string" && !t.match(/\d{13}/)) {
    t = parseDate(t).getTime();
  }
  t = parseInt(t, 10) - new Date().getTimezoneOffset() * 60 * 1000;
  return t;
}
const goToNextMonth = (month, index) => {
  const isMonth2 = index === 1;
  let nextMonth = isMonth2 ? months.value['month2'] : months.value['month1'];
  nextMonth = getNextMonth(nextMonth);

  // Dont't go to the next month if:
  // 1. The second month is visible and it is the next month after
  //    our current month
  // 2. The month is after the (optional) endDate. There's no need
  //    to show other months in this case.
  if (!isSingleMonth() && !isMonth2 && compareMonth(nextMonth, months.value['month2']) >= 0 || isMonthOutOfRange(nextMonth)) {
    return false;
  }

  // We can now show the month and proceed
  if ((props.moveBothMonths) && isMonth2) {
    addMonth(months.value['month2'], 1);
  }
  addMonth(nextMonth, index + 1);
  updateSelectedDays();
  disableNextPrevButtons();
  return true;
}
const goToPreviousMonth = (month, index) => {
  const isMonth2 = index === 1;
  let prevMonth = isMonth2 ? months.value['month2'] : months.value['month1'];
  prevMonth = getPrevMonth(prevMonth);

  // Dont't go to the previous month if:
  // 1. The click it's in the second month and the month we need is already
  //    shown in the first month
  // 2. The month is before the (optional) startDate. There's no need
  //    to show other months in this case.
  if (isMonth2 && compareMonth(prevMonth, months.value['month1']) <= 0 || isMonthOutOfRange(prevMonth)) {
    return false;
  }

  // We can now show the month and proceed
  if ((props.moveBothMonths) && !isMonth2) {
    addMonth(months.value['month1'], 2);
  }
  addMonth(prevMonth, index + 1);
  updateSelectedDays();
  disableNextPrevButtons();
  return true;
}

const monthsDoms = ref([]);
const isSingleMonth = () => props.showSingleMonth || showSingleMonthBasedOnWindow();
const showSingleMonthBasedOnWindow = () => {
  if (props.singleMonthBreakpoint) {
    return window.innerWidth < props.singleMonthBreakpoint;
  }
  // Only if months are rendered and has fixed width (width: x% will be always less than window width)
  return window.innerWidth < getWidthOfMonth();
}
const getWidthOfMonth = () => {
  if (monthsDoms.value[0]) {
    return 2 * monthsDoms.value[0].offsetWidth + 50;
  }
  return 0;
}
const isMonthOutOfRange = (month) => {
  const _m = new Date(month.valueOf());
  // Return true for months before the startDate and months after the endDate
  return props.minDate && new Date(_m.getFullYear(), _m.getMonth() + 1, 0, 23, 59, 59) < props.minDate || props.maxDate && new Date(_m.getFullYear(), _m.getMonth(), 1) > props.maxDate;
}

// Disable next/prev buttons according to the value of the prev/next
// month. We don't want two same months at the same time!
const disableNextPrevButtons = () => {
  if (isSingleMonth()) {
    if (isMonthOutOfRange(getPrevMonth(months.value.month1))) {
      datePickerObject.value.months[0].prevBtn = false;
    } else {
      datePickerObject.value.months[0].prevBtn = true;
    }
    if (isMonthOutOfRange(getNextMonth(months.value.month1))) {
      datePickerObject.value.months[0].nextBtn = false;
    } else {
      datePickerObject.value.months[0].nextBtn = true;
    }
    return;
  }
  const _month1 = parseInt(getDateString(months.value.month1, "YYYYMM"), 10);
  const _month2 = parseInt(getDateString(months.value.month2, "YYYYMM"), 10);
  const d = Math.abs(_month1 - _month2);
  if (d > 1 && d !== 89) {
    datePickerObject.value.months[0].nextBtn = true;
    datePickerObject.value.months[1].prevBtn = true;
  } else {
    datePickerObject.value.months[0].nextBtn = false;
    datePickerObject.value.months[1].prevBtn = false;
  }
  if (isMonthOutOfRange(getPrevMonth(months.value.month1))) {
    datePickerObject.value.months[0].prevBtn = false;
  } else {
    datePickerObject.value.months[0].prevBtn = true;
  }
  if (isMonthOutOfRange(getNextMonth(months.value.month2))) {
    datePickerObject.value.months[1].nextBtn = false;
  } else {
    datePickerObject.value.months[1].nextBtn = true;
  }
}
const updateSelectableRange = () => {
  const isSelecting = start.value && !end.value;
  // Add needed classes
  for (let x = 0; x < datePickerObject.value.months.length; x++) {
    for (let i = 0; i < datePickerObject.value.months[x].days.length; i++) {
      let newDay = datePickerObject.value.months[x].days[i];

      if (!newDay.isValid && newDay.isTmp) {
        newDay.isTmp = false;
        if (!newDay.isTmpValid) {
          newDay.isTmpValid = true;
        } else {
          newDay.isValid = true;
        }
      }
      // Update day classes during the date range selection
      if (isSelecting) {
        if (newDay.isCurrentMonth && (newDay.isValid || newDay.isDisabled || newDay.isBeforeDisabledDate)) {
          const time = parseInt(newDay.time, 10);
          if (isValidDate(time)) {
            newDay.isValid = true;
            newDay.isTmp = true;
            newDay.isDisabled = false;
          } else {
            if (!newDay.valid) {
              newDay.isTmpValid = false;
            }
            newDay.isValid = false;
            newDay.isTmp = true;
          }
        }
      } else if (newDay.checkOutEnabled || newDay.beforeDisabledDate) {
        // At the end of the selection, restore the disabled/invalid class for
        // days where the checkout is enabled. We need to check this when the
        // autoclose option is false. The same for the day just before the
        // disabled date
        newDay.isValid = false;
        if (!newDay.beforeDisabledDate) {
          newDay.isDisabled = true;
        }
      }

      datePickerObject.value.months[x].days.splice(i, 1, newDay);
    }
  }
  return true;
}
const dayHovering = (day, monthIndex) => {
  const hoverTime = parseInt(day.time, 10);
  if (day.isValid) {
    // Get every td in the months table: our days

    // Iterate each day and add the hovering class
    for (let x = 0; x < datePickerObject.value.months.length; x++) {
      for (let i = 0; i < datePickerObject.value.months[x].days.length; i++) {
        const time = parseInt(datePickerObject.value.months[x].days[i].time, 10);
        if (time === hoverTime) {
          datePickerObject.value.months[x].days[i].isHovering = true;
        } else {
          datePickerObject.value.months[x].days[i].isHovering = false;
        }
        if (start.value && !end.value && (start.value < time && hoverTime >= time || start.value > time && hoverTime <= time)) {
          datePickerObject.value.months[x].days[i].isHovering = true;
        } else {
          datePickerObject.value.months[x].days[i].isHovering = false;
        }
      }
    }
    // Generate date range tooltip
    if (start.value && !end.value) {
      popup.count = countDays(hoverTime, start.value) - 1;
    }
  }
}
const clearHovering = () => {
  // Set hovering property to false
  for (let x = 0; x < datePickerObject.value.months.length; x++) {
    for (let i = 0; i < datePickerObject.value.months[x].days.length; i++) {
      datePickerObject.value.months[x].days[i].isHovering = false;
    }
  }
}
const parseDisabledDates = () => {
  // Sort disabled dates and store it in property
  const _tmp = [];
  setFechaI18n();
  for (let i = 0; i < props.disabledDates.length; i++) {
    _tmp[i] = fecha.parse(props.disabledDates[i], "YYYY-MM-DD");
  }
  _tmp.sort((a, b) => {
    return a - b;
  });
  disabledDatesTime.value = _tmp;
}
const getClosestDisabledDates = (x) => {
  // This method implements part of the work done by the user Zeta
  // http://stackoverflow.com/a/11795472

  // Return an array with two elements:
  // - The closest date on the left
  // - The closest date on the right
  let dates = [false, false];

  // If the day is before the first disabled date return early
  if (x < disabledDatesTime.value[0]) {
    // Add one day if we want include the checkout
    if (props.enableCheckout) {
      dates = [false, addDays(disabledDatesTime.value[0], 1)];
      // Otherwise use the first date of the array
    } else {
      dates = [false, disabledDatesTime.value[0]];
    }

    // If the day is after the last disabled date return early
  } else if (x > disabledDatesTime.value[disabledDatesTime.value.length - 1]) {
    dates = [disabledDatesTime.value[disabledDatesTime.value.length - 1], false];
    // Otherwise calculate the closest dates
  } else {
    let bestPrevDate = disabledDatesTime.value.length;
    let bestNextDate = disabledDatesTime.value.length;

    const maxDateValue = Math.abs(new Date(0, 0, 0).valueOf());

    let bestPrevDiff = maxDateValue;
    let bestNextDiff = -maxDateValue;
    let currDiff = 0;
    let i;
    for (i = 0; i < disabledDatesTime.value.length; ++i) {
      currDiff = x - disabledDatesTime.value[i];
      if (currDiff < 0 && currDiff > bestNextDiff) {
        bestNextDate = i;
        bestNextDiff = currDiff;
      }
      if (currDiff > 0 && currDiff < bestPrevDiff) {
        bestPrevDate = i;
        bestPrevDiff = currDiff;
      }
    }
    if (disabledDatesTime.value[bestPrevDate]) {
      dates[0] = disabledDatesTime.value[bestPrevDate];
    }
    if (typeof disabledDatesTime.value[bestPrevDate] === "undefined") {
      dates[1] = false;
      // Add one day if we want include the checkout
    } else if (props.enableCheckout) {
      dates[1] = addDays(disabledDatesTime.value[bestNextDate], 1);
      // Otherwise use the date of the array
    } else {
      dates[1] = disabledDatesTime.value[bestNextDate];
    }
  }
  return dates;
}

const disabledDaysIndexes = ref([]);
const getDisabledDays = () => {
  const allDays = [];
  const disabledDays = [];
  const day = new Date();
  for (let i = 0; i < 7; i++) {
    const _date = addDays(day, i);
    allDays[fecha.format(_date, "d")] = fecha.format(_date, "dddd");
  }
  for (let i = 0; i < props.disabledDaysOfWeek.length; i++) {
    disabledDays.push(allDays.indexOf(props.disabledDaysOfWeek[i]));
  }
  disabledDays.sort();
  disabledDaysIndexes.value = disabledDays;
}
const getClosestDisabledDays = (day) => {
  // Return an array with two elements:
  // - The closest date on the left
  // - The closest date on the right
  const dates = [false, false];
  for (let i = 0; i < 7; i++) {
    const _date = substractDays(day, i);
    if (disabledDaysIndexes.value.indexOf(parseInt(fecha.format(_date, "d"), 10)) > -1) {
      dates[0] = _date;
      break;
    }
  }
  for (let i = 0; i < 7; i++) {
    const _date = addDays(day, i);
    if (disabledDaysIndexes.value.indexOf(parseInt(fecha.format(_date, "d"), 10)) > -1) {
      dates[1] = _date;
      break;
    }
  }
  return dates;
}
const lang = (s) => {
  // Return i18n string
  return s in props.i18n ? props.i18n[s] : "";
}
const langTC = (s, c) => {
  // Return i18n string
  return c ? s + 's' in props.i18n ? c + ' ' + props.i18n[s + 's'] : "" : props.i18n['not selected'];
}
const replacei18n = (string, value) => {
  return string.replace("%s", value);
}
const setRange = (d1, d2) => {
  if (typeof d1 === "string" && typeof d2 === "string") {
    d1 = parseDate(d1);
    d2 = parseDate(d2);
  } else {
    d1 = new Date(d1.getTime());
    d2 = new Date(d2.getTime());
  }
  setDateRange(d1, d2);
}

const popup = reactive(
    {
      show: false,
      top: 0,
      left: 0,
      width: 0,
      count: 0,
      error: false,
    }
)

const hidePopover = () => popup.show = false;

const showPopover = (event, day) => {
  //Prevent handle when selecting not started or already ended
  if (!selectedDatesTmp.value.start || selectedDatesTmp.value.start && selectedDatesTmp.value.end) {
    return false;
  }
  popup.show = true;
  const parentRect = parent.value.getBoundingClientRect();
  const childRect = event.target.getBoundingClientRect();
  popup.top = childRect.top - parentRect.top - 35;
  popup.left = childRect.left - parentRect.left;
  popup.width = childRect.width;
};

// Required for the popover position
const parent = ref(null);

const windowWidthChanged = () => {
  datePickerObject.value.showSingleMonth = isSingleMonth();
}

watch(() => datePickerObject.value.showSingleMonth, () => {
  disableNextPrevButtons();
})

onUnmounted(() => {
  window.removeEventListener('resize', () => windowWidthChanged());
})

onMounted(() => {
  datePickerObject.value.showSingleMonth = isSingleMonth();
  window.addEventListener('resize', () => windowWidthChanged());
  init();
})

</script>

<template>
  <div class="datepicker" ref="parent">
    <div
        :class="{'opacity-0':!popup.show}"
        class="absolute z-10 bg-secondary p-2 rounded-d text-white text-xxs text-center"
        :style="{ top: popup.top + 'px', left: popup.left + 'px', width: popup.width  + 'px' }
">
      <slot name="popup" :nights="popup.count">
        {{ langTC("night", popup.count) }}
      </slot>
    </div>
    <div
        v-for="(month, index) in datePickerObject.months"
        :key="month.id"
        ref="monthsDoms"
        class="flex-col flex "
        :class="{
          'hidden': index === 1 && datePickerObject.showSingleMonth,
          'w-[45%]': !datePickerObject.showSingleMonth,
          'w-[100%] px-[5%]': datePickerObject.showSingleMonth,
        }"
    >
      <div class="w-full flex items-center justify-between h-14">
        <div
            class="flex flex-center text-2xl font-bold mb-5"
        >
          <div @click="goToPreviousMonth(month, index)"
               class="w-full h-full cursor-pointer block"
               :class="{
                'opacity-0': !month.prevBtn,
                }"
          >
            <slot name="prev"> <<</slot>
          </div>
        </div>
        <div class="flex flex-center text-2xl font-bold mb-5 text-center whitespace-nowrap">
          <slot name="month" :month="month">
            {{ month.name }} {{ month.year }}
          </slot>
        </div>
        <div
            class="flex flex-center text-2xl font-bold mb-5"
        >
          <div @click="goToNextMonth(month, index)"
               class="w-full h-full cursor-pointer block text-right"
               :class="{
                'opacity-0': !month.nextBtn,
                }"
          >
            <slot name="next"> >></slot>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap justify-between">
        <div
            class="datepicker__month-day datepicker__week-name"
            v-for="weekName in getWeekDayNames()"
        >
          <slot
              name="weekday"
              :weekday="weekName"
          >
            {{ weekName }}
          </slot>
        </div>
        <div
            v-for="day in month.days"
            @click="dayClicked(day, index + 1)"
            @mouseover="dayHovering(day, index + 1) || showPopover($event, day)"
            :class="{
            'day--notCurrentMonth': !day.isCurrentMonth,
            'datepicker__month-day--valid': day.isValid,
            'datepicker__month-day--invalid': !day.isValid,
            'datepicker__month-day--tmpinvalid': !day.isTmpValid,
            'datepicker__month-day--tmp': day.isTmpValid,
            'datepicker__month-day--disabled': day.isDisabled,
            'datepicker__month-day--checkout-enabled': day.isCheckOutEnabled,
            'datepicker__month-day--checkout-disabled': !day.isCheckOutEnabled,
            'datepicker__month-day--before-disabled-date': day.isDayBeforeDisabledDate,
            'datepicker__month-day--first-day-selected': day.isFirstDaySelected,
            'datepicker__month-day--last-day-selected': day.isLastDaySelected,
            'datepicker__month-day--selected': day.isSelected,
            'datepicker__month-day--hovering': day.isHovering,
          }"
            class="datepicker__month-day"
        >
          {{ day.day }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* =============================================================
 * BASE STYLES
 * ============================================================*/
.datepicker {
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  width: 260px;
  z-index: 1;
}

.datepicker--inline {
  position: relative;
}

.datepicker__inner {
  overflow: hidden;
}

.datepicker__month {
  border-collapse: collapse;
  text-align: center;
  width: 100%;
}

.datepicker__month--month2 {
  display: none;
}

.datepicker__month-day--valid {
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}

.day--notCurrentMonth {
  opacity: 0;
  cursor: default;
}

.datepicker__month-button {
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}

.datepicker__info--feedback {
  display: none;
}

.datepicker__info--error,
.datepicker__info--help {
  display: block;
}

datepicker__buttons {
  -webkit-user-select: none;
  user-select: none;
}

.datepicker__close-button,
.datepicker__clear-button {
  cursor: pointer;
}

.datepicker__tooltip {
  position: absolute;
}

/* =============================================================
 * THEME
 * ============================================================*/
.datepicker {
  color: #000;
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  padding: 25px;
  min-height: 600px;
  position: relative;
  font-family: "Helvetica", "Helvetica Neue", "Arial", sans-serif;
  font-size: 14px;
  line-height: 14px;
}

.datepicker__inner {
  padding: 20px;
}

.datepicker__month {
  font-size: 17px;
  border-collapse: separate!important;
  border-spacing: 5px;
  height: 450px;
}

.datepicker__month-caption {
  border-bottom: 1px solid #dcdcdc;
  height: 2.5em;
  vertical-align: middle;
}

.datepicker__month-name {
  text-transform: uppercase;
}

.datepicker__week-days {
  height: 2em;
  vertical-align: middle;
}

.datepicker__week-name {
  font-size: 11px;
  font-weight: 400;
  text-transform: uppercase;
}

.datepicker__month-day {
  transition-duration: 0.2s;
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  color: #333;
  width: 13%;
  border-radius: 20px;
  height: 65px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.datepicker__month-day:focus {
  outline: none;
  background-color: #ffe684;
}

.datepicker__month-day--no-checkin {
  position: relative;
}

.datepicker__month-day--no-checkin:before {
  bottom: 0;
  content: "";
  display: block;
  left: 0;
  position: absolute;
  z-index: -1;
  width: 0;
  height: 0;
  border-bottom: 8px solid red;
  border-right: 8px solid transparent;
}

.datepicker__month-day--no-checkout {
  position: relative;
}

.datepicker__month-day--no-checkout:before {
  top: 0;
  content: "";
  display: block;
  right: 0;
  position: absolute;
  z-index: -1;
  width: 0;
  height: 0;
  border-top: 8px solid red;
  border-left: 8px solid transparent;
}

.datepicker__month-day--no-checkin.datepicker__month-day--no-checkout:before {
  content: none;
}

.datepicker__month-day--invalid {
  color: #e8ebf4;
}

.datepicker__month-day--disabled, .datepicker__month-day--disabled.datepicker__month-day--selected.datepicker__month-day--last-day-selected {
  background-color: #fcb2be!important;
  position: relative;
}

.datepicker__month-day--disabled.datepicker__month-day--selected.datepicker__month-day--last-day-selected {
  background-color: #5b5051 !important;
  position: relative;
}

.datepicker__month-day--disabled.datepicker__month-day--selected.datepicker__month-day--last-day-selected.datepicker__month-day--checkout-enabled {
  background-color: #005172 !important;
}

.datepicker__month-day--disabled.datepicker__month-day--selected {
  background-color: #5b5051 !important;
  position: relative;
}

.datepicker__month-day--no-checkin,
.datepicker__month-day--no-checkout,
.datepicker__month-day--day-of-week-disabled {
  background-color: rgba(232, 235, 244, 0.5);
}

.datepicker__month-day--selected {
  background-color: rgb(31, 197, 255);
  color: #fff;
}

.datepicker__month-day--selected:after, .datepicker__month-day--selected:before {
  display: none;
}

.datepicker__month-day--hovering {
  background-color: #008ebd;
  color: #fff;
}

.datepicker__month-day--first-day-selected,
.datepicker__month-day--last-day-selected {
  background-color: #005172;
  color: #fff;
}

.datepicker__month-day--last-day-selected:after {
  content: none;
}

.datepicker__month-button {
  transition-duration: 0.2s;
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-block;
  background-color: #dbebfd;
  padding: 10px 15px;
  color: white;
  border-radius: 5px;
  text-indent: -9999px;
}

.datepicker__month-button:after {
  background-repeat: no-repeat;
  background-position: center;
  float: left;
  text-indent: 0;
  content: "";
  width: 12px;
  height: 12px;
}

.datepicker__month-button--prev:after {
  background-image: url(/icons/left.svg);
}

.datepicker__month-button--next:after {
  background-image: url(/icons/right.svg);
}

.datepicker__topbar {
  margin-bottom: 20px;
  padding: 0 10px;
  position: relative;
}

.datepicker--topbar-bottom .datepicker__topbar {
  margin-bottom: 0;
  padding-top: 20px;
  border-top: 1px solid #dcdcdc;
}

.datepicker__info-text {
  font-size: 13px;
}

.datepicker__info--selected {
  font-size: 17px;
  text-transform: uppercase;
}

.datepicker__info--selected-label {
  color: #333;
}

.datepicker__info-text--selected-days {
  font-size: 11px;
  font-style: normal;
}

.datepicker__info--error {
  color: red;
  font-size: 13px;
  font-style: italic;
}

.datepicker__info--help {
  color: #333;
  font-style: italic;
}

.datepicker__close-button,
.datepicker__clear-button,
.datepicker__submit-button {
  transition-duration: 0.2s;
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #3858e9;
  border-radius: 2px;
  border: none;
  box-shadow: none;
  font-size: 10px;
  color: #ffffff;
  margin-top: 20px;
  padding: 7px 13px;
  text-decoration: none;
  text-shadow: none;
  text-transform: uppercase;
}

.datepicker--topbar-top .datepicker__close-button, .datepicker--topbar-top
.datepicker__clear-button, .datepicker--topbar-top
.datepicker__submit-button {
  margin-top: 0;
}

.datepicker__close-button:hover,
.datepicker__clear-button:hover,
.datepicker__submit-button:hover {
  background-color: #213fd4;
  color: #ffffff;
}

.datepicker__close-button:disabled, .datepicker__close-button[disabled],
.datepicker__clear-button:disabled,
.datepicker__clear-button[disabled],
.datepicker__submit-button:disabled,
.datepicker__submit-button[disabled] {
  background-color: #c8c9d0;
  color: #ffffff;
  cursor: not-allowed;
}

.datepicker__clear-button + .datepicker__close-button {
  margin-left: 10px;
}

.datepicker__clear-button + .datepicker__submit-button {
  margin-left: 10px;
}

.datepicker__submit-button {
  width: auto;
}

.datepicker__tooltip {
  background-color: #ffe684;
  border-radius: 1px;
  font-size: 11px;
  margin-top: -5px;
  padding: 5px 10px;
}

.datepicker__tooltip:after {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #ffe684;
  bottom: -4px;
  content: "";
  left: 50%;
  margin-left: -4px;
  position: absolute;
}

@media (min-width: 320px ) and (max-width: 479px ) {
  .datepicker {
    width: 100vw;
    display: block;
  }

  .datepicker__inner {
    padding: 0;
  }
}

@media (min-width: 780px) {
  .datepicker__months {
    display: flex;
  }
}
@media (min-width: 480px) and (max-width: 942px) {
  .datepicker__months {
    display: grid;
  }
}

@media (min-width: 480px) {
  .datepicker {
    width: 460px;
  }
  .datepicker__months {
    overflow: hidden;
  }
  .datepicker__month {
    width: 200px;
  }
  .datepicker__month--month1 {
    float: left;
  }
  .datepicker__month--month2 {
    display: table;
    float: right;
  }
  .datepicker__months {
    position: relative;
  }
  .date_picker__btn {
    display: grid;
  }
  .datepicker__month-button--disabled {
    visibility: hidden;
  }
  .datepicker__months:before {
    background: #dcdcdc;
    bottom: 0;
    content: "";
    display: none;
    left: 50%;
    position: absolute;
    top: 0;
    width: 1px;
  }
}

@media (min-width: 942px) {
  .datepicker {
    width: 100%;
  }
  .datepicker__month {
    width: 50%;
  }
  .datepicker--topbar-has-close-button .datepicker__info,
  .datepicker--topbar-has-clear-button .datepicker__info,
  .datepicker--topbar-has-submit-button .datepicker__info {
    max-width: 325px;
  }
}
</style>