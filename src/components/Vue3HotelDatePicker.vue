<script setup lang="ts">
import * as fecha from "fecha";
import {
  computed,
  getCurrentInstance,
  nextTick,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type PropType,
} from "vue";

type DateInput = Date | string | number | false | null | undefined;
type StartOfWeek = "monday" | "sunday";
type I18nValue = string | string[];
type I18nDictionary = Record<string, I18nValue>;

interface CalendarDay {
  date: Date;
  type: "lastMonth" | "visibleMonth" | "nextMonth";
  day: number;
  time: number;
  tabindex: number;
  attributes: string[];
  isCurrentMonth: boolean;
  isValid: boolean;
  isNoCheckIn: boolean;
  isNoCheckOut: boolean;
  isToday: boolean;
  isDisabled: boolean;
  disabled: boolean;
  isCheckOutEnabled: boolean;
  isDayBeforeDisabledDate: boolean;
  isCheckInOnly: boolean;
  isDayWithExtraText: boolean;
  isFirstDaySelected: boolean;
  isLastDaySelected: boolean;
  isSelected: boolean;
  isHovering: boolean;
  isTmpValid: boolean;
  isTmp: boolean;
}

interface CalendarMonth {
  name: string;
  month: number;
  year: number;
  id: string;
  days: CalendarDay[];
  nextBtn: boolean;
  prevBtn: boolean;
}

const DEFAULT_I18N: I18nDictionary = {
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
  "aria-prev-month": "Move backward to the previous month",
  "aria-next-month": "Move forward to the next month",
  "aria-clear-button": "Clear the selected dates",
  "select-checkout": "Select a check-out date",
  "forward-only": "Please select a check-out date after check-in",
  "same-day": "Check-out must be after check-in",
  multiple: "The stay must be a multiple of %d nights",
  unavailable: "This date range is not available",
};

const props = defineProps({
  format: { type: String, default: "YYYY-MM-DD" },
  startOfWeek: { type: String as PropType<StartOfWeek>, default: "monday" },
  separator: { type: String, default: "-" },
  selectedDates: { type: [Array, Boolean] as PropType<DateInput[] | false>, default: false },
  startDate: { type: [Date, String, Number, Boolean] as PropType<DateInput>, default: false },
  endDate: { type: [Date, String, Number, Boolean] as PropType<DateInput>, default: false },
  minDate: { type: [Date, String, Number, Boolean] as PropType<DateInput>, default: () => new Date() },
  maxDate: { type: [Date, String, Number, Boolean] as PropType<DateInput>, default: false },
  disabledDaysOfWeek: { type: Array as PropType<string[]>, default: () => [] },
  showTopbar: { type: Boolean, default: false },
  moveBothMonths: { type: Boolean, default: false },
  ariaDayFormat: { type: String, default: "dddd, MMMM DD, YYYY" },
  noCheckOutDates: { type: Array as PropType<DateInput[]>, default: () => [] },
  noCheckInDates: { type: Array as PropType<DateInput[]>, default: () => [] },
  noCheckInDaysOfWeek: { type: Array as PropType<string[]>, default: () => [] },
  noCheckOutDaysOfWeek: { type: Array as PropType<string[]>, default: () => [] },
  maxNights: { type: Number, default: 0 },
  minNights: { type: Number, default: 1 },
  singleMonthBreakpoint: { type: [Number, String, Boolean] as PropType<number | string | false>, default: 768 },
  topbarPosition: { type: String as PropType<"top" | "bottom">, default: "top" },
  onOpenDatepicker: { type: Boolean, default: false },
  minNightsMultiple: { type: Boolean, default: false },
  selectForward: { type: Boolean, default: false },
  showSingleMonth: { type: Boolean, default: false },
  disabledDates: { type: [Array, Boolean] as PropType<DateInput[] | false>, default: false },
  daysWithExtraText: { type: Array as PropType<DateInput[]>, default: () => [] },
  enableCheckout: { type: Boolean, default: false },
  weekDays: {
    type: Array as PropType<string[]>,
    default: () => ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
  },
  monthNames: {
    type: Array as PropType<string[]>,
    default: () => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
  getValues: { type: Function as PropType<() => unknown>, default: undefined },
  extraDayText: { type: Function as PropType<(day: CalendarDay) => string>, default: undefined },
  i18n: { type: Object as PropType<Partial<I18nDictionary>>, default: () => ({}) },
  mobileMonths: { type: Number, default: 12 },
});

const emit = defineEmits<{
  selected: [payload: { start: number; end: number }];
  select: [payload: { start: number; end: number }];
  change: [payload: { start: string | false; end: string | false }];
  "update:startDate": [value: string | false];
  "update:endDate": [value: string | false];
}>();

defineSlots<{
  popup?: (props: { nights: number; error: boolean }) => unknown;
  month?: (props: { month: CalendarMonth }) => unknown;
  weekday?: (props: { weekday: string }) => unknown;
  day?: (props: { day: CalendarDay }) => unknown;
  next?: () => unknown;
  prev?: () => unknown;
}>();

const root = ref<HTMLElement | null>(null);
const instanceId = `h-datepicker-${getCurrentInstance()?.uid ?? "standalone"}`;
const monthElements = ref<HTMLElement[]>([]);
const isMobileLayout = ref(false);
const selectedStart = ref<Date | null>(null);
const selectedEnd = ref<Date | null>(null);
const hoveredDate = ref<Date | null>(null);
const focusedDayKey = ref("");
const selectionError = ref("");
const viewStart = ref(startOfMonth(new Date()));
const popup = ref({ show: false, top: 0, left: 0, width: 0, count: 0, error: false });

const messages = computed<I18nDictionary>(() => ({
  ...DEFAULT_I18N,
  "day-names-short": props.weekDays,
  "month-names": props.monthNames,
  ...props.i18n,
} as I18nDictionary));
const i18nSettings = computed<fecha.I18nSettingsOptional>(() => ({
  dayNamesShort: langArray("day-names-short", 7) as fecha.Days,
  dayNames: langArray("day-names", 7) as fecha.Days,
  monthNamesShort: langArray("month-names-short", 12) as fecha.Months,
  monthNames: langArray("month-names", 12) as fecha.Months,
}));

const minDateValue = computed(() => normalizeDate(props.minDate) ?? normalizeDate(new Date())!);
const maxDateValue = computed(() => normalizeDate(props.maxDate));
const disabledDateKeys = computed(() => toDateKeySet(props.disabledDates || []));
const noCheckInDateKeys = computed(() => toDateKeySet(props.noCheckInDates));
const noCheckOutDateKeys = computed(() => toDateKeySet(props.noCheckOutDates));
const extraTextDateKeys = computed(() => toDateKeySet(props.daysWithExtraText));
const todayKey = computed(() => dateKey(normalizeDate(new Date())!));
const selectedNights = computed(() => selectedStart.value && selectedEnd.value
  ? calendarDayDifference(selectedStart.value, selectedEnd.value)
  : 0);
const mobileMonthCount = computed(() => Math.min(24, Math.max(2, Math.trunc(props.mobileMonths) || 12)));
const renderedMonthCount = computed(() => {
  if (props.showSingleMonth) return 1;
  if (isMobileLayout.value) {
    const maximum = maxDateValue.value;
    return maximum
      ? Math.max(1, Math.min(mobileMonthCount.value, monthDifference(viewStart.value, maximum) + 1))
      : mobileMonthCount.value;
  }
  const desktopCount = props.showSingleMonth ? 1 : 2;
  const maximum = maxDateValue.value;
  return maximum ? Math.max(1, Math.min(desktopCount, monthDifference(viewStart.value, maximum) + 1)) : desktopCount;
});
const calendarMonths = computed<CalendarMonth[]>(() => Array.from(
  { length: renderedMonthCount.value },
  (_, index) => buildMonth(addCalendarMonths(viewStart.value, index), index),
));
const canMoveToPreviousMonth = computed(() => endOfMonth(addCalendarMonths(viewStart.value, -1)).getTime() >= minDateValue.value.getTime());
const canMoveToNextMonth = computed(() => {
  const maximum = maxDateValue.value;
  return !maximum || addCalendarMonths(viewStart.value, 1).getTime() <= startOfMonth(maximum).getTime();
});
const topbarText = computed(() => {
  if (selectionError.value) return selectionError.value;
  if (selectedStart.value && selectedEnd.value) {
    const unit = selectedNights.value === 1 ? lang("night") : lang("nights");
    return `${lang("selected")} ${formatDate(selectedStart.value)}${props.separator}${formatDate(selectedEnd.value)} · ${selectedNights.value} ${unit}`;
  }
  if (selectedStart.value) return validationMessage("select-checkout");
  return lang("info-default");
});

function lang(key: string): string {
  const value = messages.value[key];
  return typeof value === "string" ? value : "";
}

function langArray(key: string, expectedLength: number): string[] {
  const value = messages.value[key];
  const fallback = DEFAULT_I18N[key];
  if (Array.isArray(value) && value.length === expectedLength) return value;
  return Array.isArray(fallback) ? fallback : [];
}

function replaceToken(template: string, value: string | number, token = "%s"): string {
  return template.replace(token, String(value));
}

function normalizeDate(input: DateInput, inputFormat = props.format): Date | null {
  if (input === false || input === null || input === undefined || input === "") return null;
  let result: Date | null;
  if (input instanceof Date) result = new Date(input.getTime());
  else if (typeof input === "number") result = new Date(input);
  else result = fecha.parse(input, inputFormat, i18nSettings.value) ?? fecha.parse(input, "YYYY-MM-DD", i18nSettings.value);
  if (!result || Number.isNaN(result.getTime())) return null;
  return new Date(result.getFullYear(), result.getMonth(), result.getDate(), 12);
}

function formatDate(input: DateInput, mask = props.format): string {
  const date = normalizeDate(input);
  return date ? fecha.format(date, mask, i18nSettings.value) : "";
}

function dateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function toDateKeySet(values: DateInput[]): Set<string> {
  return new Set(values
    .map((value) => normalizeDate(value))
    .filter((value): value is Date => Boolean(value))
    .map(dateKey));
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1, 12);
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 12);
}

function addCalendarDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount, 12);
}

function addCalendarMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1, 12);
}

function monthDifference(first: Date, second: Date): number {
  return (second.getFullYear() - first.getFullYear()) * 12 + second.getMonth() - first.getMonth();
}

function calendarOrdinal(date: Date): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
}

function calendarDayDifference(first: Date, second: Date): number {
  return Math.abs(calendarOrdinal(second) - calendarOrdinal(first));
}

function compareDates(first: Date, second: Date): number {
  return calendarOrdinal(first) - calendarOrdinal(second);
}

function isWithinBounds(date: Date): boolean {
  if (compareDates(date, minDateValue.value) < 0) return false;
  const maximum = maxDateValue.value;
  return !maximum || compareDates(date, maximum) <= 0;
}

function matchesWeekdayRule(date: Date, rules: string[]): boolean {
  const index = date.getDay();
  const candidates = [
    langArray("day-names-short", 7)[index],
    langArray("day-names", 7)[index],
    (DEFAULT_I18N["day-names-short"] as string[])[index],
    (DEFAULT_I18N["day-names"] as string[])[index],
  ].map((value) => value.toLocaleLowerCase());
  return rules.some((rule) => candidates.includes(String(rule).toLocaleLowerCase()));
}

function isHardBlocked(date: Date): boolean {
  return disabledDateKeys.value.has(dateKey(date)) || matchesWeekdayRule(date, props.disabledDaysOfWeek);
}

function isCheckInBlocked(date: Date): boolean {
  return isHardBlocked(date)
    || noCheckInDateKeys.value.has(dateKey(date))
    || matchesWeekdayRule(date, props.noCheckInDaysOfWeek);
}

function isCheckOutBlocked(date: Date): boolean {
  return noCheckOutDateKeys.value.has(dateKey(date))
    || matchesWeekdayRule(date, props.noCheckOutDaysOfWeek);
}

function canSelectCheckIn(date: Date): boolean {
  return isWithinBounds(date) && !isCheckInBlocked(date);
}

function rangeError(first: Date, second: Date): string {
  const start = compareDates(first, second) <= 0 ? first : second;
  const end = start === first ? second : first;
  if (!canSelectCheckIn(start) || !isWithinBounds(end)) return validationMessage("unavailable");
  if (props.selectForward && compareDates(second, first) < 0) return validationMessage("forward-only");
  if (isCheckOutBlocked(end)) return validationMessage("checkout-disabled");

  const nights = calendarDayDifference(start, end);
  if (nights === 0) return validationMessage("same-day");
  if (nights < Math.max(1, props.minNights)) return validationMessage("min", props.minNights);
  if (props.maxNights > 0 && nights > props.maxNights) return validationMessage("max", props.maxNights);
  if (props.minNightsMultiple && nights % Math.max(1, props.minNights) !== 0) return validationMessage("multiple", props.minNights);

  for (let cursor = addCalendarDays(start, 1); compareDates(cursor, end) <= 0; cursor = addCalendarDays(cursor, 1)) {
    if (!isHardBlocked(cursor)) continue;
    if (!(props.enableCheckout && compareDates(cursor, end) === 0)) return validationMessage("unavailable");
  }
  return "";
}

function validationMessage(type: string, value?: number): string {
  if (type === "min") return replaceToken(value === 1 ? lang("error-less") : lang("error-less-plural"), value ?? 1, "%d");
  if (type === "max") return replaceToken(value === 1 ? lang("error-more") : lang("error-more-plural"), value ?? 1, "%d");
  if (type === "checkout-disabled") return lang("checkout-disabled");
  if (type === "select-checkout") return lang("select-checkout");
  if (type === "forward-only") return lang("forward-only");
  if (type === "same-day") return lang("same-day");
  if (type === "multiple") return replaceToken(lang("multiple"), value ?? 1, "%d");
  return lang("unavailable");
}

function isSelectableNow(date: Date): boolean {
  return selectedStart.value && !selectedEnd.value ? rangeError(selectedStart.value, date) === "" : canSelectCheckIn(date);
}

function isBetween(date: Date, first: Date, second: Date): boolean {
  const lower = Math.min(calendarOrdinal(first), calendarOrdinal(second));
  const upper = Math.max(calendarOrdinal(first), calendarOrdinal(second));
  const current = calendarOrdinal(date);
  return current >= lower && current <= upper;
}

function buildMonth(monthDate: Date, index: number): CalendarMonth {
  const firstDay = startOfMonth(monthDate);
  const leadingDays = props.startOfWeek === "monday" ? (firstDay.getDay() + 6) % 7 : firstDay.getDay();
  const gridStart = addCalendarDays(firstDay, -leadingDays);
  return {
    name: langArray("month-names", 12)[monthDate.getMonth()] ?? "",
    month: monthDate.getMonth(),
    year: monthDate.getFullYear(),
    id: `${monthDate.getFullYear()}-${monthDate.getMonth() + 1}`,
    days: Array.from({ length: 42 }, (_, dayIndex) => buildDay(addCalendarDays(gridStart, dayIndex), monthDate)),
    prevBtn: isMobileLayout.value
      ? index > 0 || canMoveToPreviousMonth.value
      : index === 0 && canMoveToPreviousMonth.value,
    nextBtn: isMobileLayout.value
      ? index < renderedMonthCount.value - 1 || canMoveToNextMonth.value
      : index === renderedMonthCount.value - 1 && canMoveToNextMonth.value,
  };
}

function buildDay(date: Date, visibleMonth: Date): CalendarDay {
  const currentMonth = date.getMonth() === visibleMonth.getMonth() && date.getFullYear() === visibleMonth.getFullYear();
  const key = dateKey(date);
  const hardBlocked = isHardBlocked(date);
  const isCheckoutEnabled = Boolean(selectedStart.value && !selectedEnd.value && hardBlocked && rangeError(selectedStart.value, date) === "");
  const selected = Boolean(currentMonth && selectedStart.value && selectedEnd.value && isBetween(date, selectedStart.value, selectedEnd.value));
  const hovering = Boolean(currentMonth && selectedStart.value && !selectedEnd.value && hoveredDate.value && isBetween(date, selectedStart.value, hoveredDate.value));
  const type: CalendarDay["type"] = currentMonth ? "visibleMonth" : compareDates(date, visibleMonth) < 0 ? "lastMonth" : "nextMonth";
  return {
    date,
    type,
    day: date.getDate(),
    time: date.getTime(),
    tabindex: focusedDayKey.value === key ? 0 : -1,
    attributes: [],
    isCurrentMonth: currentMonth,
    isValid: currentMonth && isSelectableNow(date),
    isNoCheckIn: isCheckInBlocked(date),
    isNoCheckOut: isCheckOutBlocked(date),
    isToday: key === todayKey.value,
    isDisabled: hardBlocked,
    disabled: hardBlocked,
    isCheckOutEnabled: isCheckoutEnabled,
    isDayBeforeDisabledDate: isHardBlocked(addCalendarDays(date, 1)),
    isCheckInOnly: canSelectCheckIn(date) && isCheckOutBlocked(date),
    isDayWithExtraText: extraTextDateKeys.value.has(key),
    isFirstDaySelected: key === (selectedStart.value ? dateKey(selectedStart.value) : ""),
    isLastDaySelected: key === (selectedEnd.value ? dateKey(selectedEnd.value) : ""),
    isSelected: selected,
    isHovering: hovering,
    isTmpValid: true,
    isTmp: false,
  };
}

function getWeekDayNames(): string[] {
  const days = langArray("day-names-short", 7);
  return props.startOfWeek === "monday" ? [...days.slice(1), days[0]] : days;
}

function dayAriaLabel(day: CalendarDay): string {
  const formatted = formatDate(day.date, props.ariaDayFormat);
  if (day.isFirstDaySelected) return replaceToken(lang("aria-selected-checkin"), formatted);
  if (day.isLastDaySelected) return replaceToken(lang("aria-selected-checkout"), formatted);
  if (day.isSelected) return replaceToken(lang("aria-selected"), formatted);
  if (!day.isValid) return replaceToken(lang("aria-disabled"), formatted);
  return replaceToken(lang(selectedStart.value && !selectedEnd.value ? "aria-choose-checkout" : "aria-choose-checkin"), formatted);
}

function selectDay(day: CalendarDay): void {
  if (!day.isCurrentMonth) return;
  const date = normalizeDate(day.date)!;
  if (!selectedStart.value || selectedEnd.value) {
    if (!canSelectCheckIn(date)) return;
    selectedStart.value = date;
    selectedEnd.value = null;
    selectionError.value = "";
    focusedDayKey.value = dateKey(date);
    emitSelectionChange();
    return;
  }
  const error = rangeError(selectedStart.value, date);
  if (error) {
    selectionError.value = error;
    return;
  }
  const start = compareDates(selectedStart.value, date) <= 0 ? selectedStart.value : date;
  const end = start === selectedStart.value ? date : selectedStart.value;
  selectedStart.value = normalizeDate(start)!;
  selectedEnd.value = normalizeDate(end)!;
  focusedDayKey.value = dateKey(date);
  selectionError.value = "";
  hoveredDate.value = null;
  hidePopover();
  const payload = { start: selectedStart.value.getTime(), end: selectedEnd.value.getTime() };
  emit("selected", payload);
  emit("select", payload);
  emitSelectionChange();
}

function emitSelectionChange(): void {
  const startValue = selectedStart.value ? formatDate(selectedStart.value) : false;
  const endValue = selectedEnd.value ? formatDate(selectedEnd.value) : false;
  emit("update:startDate", startValue);
  emit("update:endDate", endValue);
  emit("change", { start: startValue, end: endValue });
}

function clearSelection(): void {
  selectedStart.value = null;
  selectedEnd.value = null;
  hoveredDate.value = null;
  selectionError.value = "";
  emitSelectionChange();
}

function showPopover(event: PointerEvent, day: CalendarDay): void {
  if (isMobileLayout.value || !selectedStart.value || selectedEnd.value || !day.isCurrentMonth) return;
  hoveredDate.value = normalizeDate(day.date);
  const parentRect = root.value?.getBoundingClientRect();
  const target = event.currentTarget as HTMLElement | null;
  if (!parentRect || !target) return;
  const childRect = target.getBoundingClientRect();
  popup.value = {
    show: true,
    top: childRect.top - parentRect.top - 40,
    left: childRect.left - parentRect.left,
    width: childRect.width,
    count: calendarDayDifference(selectedStart.value, day.date),
    error: rangeError(selectedStart.value, day.date) !== "",
  };
}

function hidePopover(): void {
  hoveredDate.value = null;
  popup.value.show = false;
}

async function goToPreviousMonth(index: number): Promise<void> {
  if (isMobileLayout.value && index > 0) return scrollToMonth(index - 1);
  if (!canMoveToPreviousMonth.value) return;
  viewStart.value = addCalendarMonths(viewStart.value, -1);
  await nextTick();
  if (isMobileLayout.value) scrollToMonth(0);
}

async function goToNextMonth(index: number): Promise<void> {
  if (isMobileLayout.value && index < calendarMonths.value.length - 1) return scrollToMonth(index + 1);
  if (!canMoveToNextMonth.value) return;
  viewStart.value = addCalendarMonths(viewStart.value, 1);
  await nextTick();
  if (isMobileLayout.value) scrollToMonth(Math.min(index, calendarMonths.value.length - 1));
}

function scrollToMonth(index: number): void {
  monthElements.value[index]?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setMonthElement(element: unknown, index: number): void {
  if (element instanceof HTMLElement) monthElements.value[index] = element;
}

async function handleDayKeydown(event: KeyboardEvent, day: CalendarDay): Promise<void> {
  if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
    event.preventDefault();
    selectDay(day);
    return;
  }
  let target: Date | null = null;
  const weekOffset = props.startOfWeek === "monday" ? (day.date.getDay() + 6) % 7 : day.date.getDay();
  if (event.key === "ArrowRight") target = addCalendarDays(day.date, 1);
  if (event.key === "ArrowLeft") target = addCalendarDays(day.date, -1);
  if (event.key === "ArrowDown") target = addCalendarDays(day.date, 7);
  if (event.key === "ArrowUp") target = addCalendarDays(day.date, -7);
  if (event.key === "Home") target = addCalendarDays(day.date, -weekOffset);
  if (event.key === "End") target = addCalendarDays(day.date, 6 - weekOffset);
  if (event.key === "PageUp") target = preserveDayInMonth(day.date, -1);
  if (event.key === "PageDown") target = preserveDayInMonth(day.date, 1);
  if (!target) return;
  event.preventDefault();
  await focusDate(target);
}

function preserveDayInMonth(date: Date, monthDelta: number): Date {
  const targetMonth = addCalendarMonths(date, monthDelta);
  return new Date(targetMonth.getFullYear(), targetMonth.getMonth(), Math.min(date.getDate(), endOfMonth(targetMonth).getDate()), 12);
}

async function focusDate(date: Date): Promise<void> {
  if (!isWithinBounds(date)) return;
  const lastMonth = addCalendarMonths(viewStart.value, renderedMonthCount.value - 1);
  if (monthDifference(viewStart.value, date) < 0 || monthDifference(date, lastMonth) < 0) viewStart.value = startOfMonth(date);
  focusedDayKey.value = dateKey(date);
  await nextTick();
  root.value?.querySelector<HTMLElement>(`[data-date="${dateKey(date)}"]`)?.focus();
}

function syncSelectionFromProps(): void {
  const values = Array.isArray(props.selectedDates) ? props.selectedDates : [];
  const first = normalizeDate(props.startDate || values[0]);
  const second = normalizeDate(props.endDate || values[1]);
  selectedStart.value = first;
  selectedEnd.value = first && second ? second : null;
  if (first && second && compareDates(first, second) > 0) {
    selectedStart.value = second;
    selectedEnd.value = first;
  }
  const anchor = selectedStart.value && isWithinBounds(selectedStart.value) ? selectedStart.value : minDateValue.value;
  viewStart.value = startOfMonth(anchor);
  focusedDayKey.value = dateKey(anchor);
  selectionError.value = "";
}

function updateResponsiveLayout(): void {
  if (typeof window === "undefined") return;
  const configuredBreakpoint = Number(props.singleMonthBreakpoint);
  const breakpoint = props.singleMonthBreakpoint === false || !Number.isFinite(configuredBreakpoint)
    ? 768
    : Math.max(320, configuredBreakpoint);
  const componentWidth = root.value?.clientWidth || window.innerWidth;
  isMobileLayout.value = Math.min(componentWidth, window.innerWidth) < breakpoint;
}

let resizeObserver: ResizeObserver | null = null;

watch(
  () => [props.startDate, props.endDate, props.selectedDates, props.minDate, props.maxDate, props.format] as const,
  syncSelectionFromProps,
  { deep: true, immediate: true },
);
watch(() => props.singleMonthBreakpoint, updateResponsiveLayout);
onBeforeUpdate(() => { monthElements.value = []; });
onMounted(() => {
  updateResponsiveLayout();
  if (typeof ResizeObserver !== "undefined" && root.value) {
    resizeObserver = new ResizeObserver(updateResponsiveLayout);
    resizeObserver.observe(root.value);
  } else {
    window.addEventListener("resize", updateResponsiveLayout, { passive: true });
  }
});
onUnmounted(() => {
  resizeObserver?.disconnect();
  window.removeEventListener("resize", updateResponsiveLayout);
});

defineExpose({
  clear: clearSelection,
  getValues: () => ({
    start: selectedStart.value ? formatDate(selectedStart.value) : false,
    end: selectedEnd.value ? formatDate(selectedEnd.value) : false,
  }),
  setRange: (start: DateInput, end: DateInput) => {
    const nextStart = normalizeDate(start);
    const nextEnd = normalizeDate(end);
    if (!nextStart || !nextEnd) return false;
    const error = rangeError(nextStart, nextEnd);
    if (error) {
      selectionError.value = error;
      return false;
    }
    selectedStart.value = compareDates(nextStart, nextEnd) <= 0 ? nextStart : nextEnd;
    selectedEnd.value = compareDates(nextStart, nextEnd) <= 0 ? nextEnd : nextStart;
    viewStart.value = startOfMonth(selectedStart.value);
    emitSelectionChange();
    return true;
  },
});
</script>

<template>
  <section
    ref="root"
    class="h-datepicker h_datepicker"
    :class="{
      'h-datepicker--mobile': isMobileLayout,
      'h_datepicker_mobile': isMobileLayout,
      'h-datepicker--topbar-bottom': topbarPosition === 'bottom',
    }"
    :aria-label="lang('aria-application')"
  >
    <div
      v-if="popup.show"
      class="h-datepicker__popup h_datepicker_popup"
      :class="{ 'h-datepicker__popup--error': popup.error }"
      :style="{ top: `${popup.top}px`, left: `${popup.left}px`, width: `${popup.width}px` }"
      role="status"
    >
      <slot name="popup" :nights="popup.count" :error="popup.error">
        {{ popup.count }} {{ popup.count === 1 ? lang("night") : lang("nights") }}
      </slot>
    </div>

    <div
      v-if="showTopbar"
      class="h-datepicker__topbar"
      :class="{ 'h-datepicker__topbar--error': selectionError }"
      aria-live="polite"
    >
      <span>{{ topbarText }}</span>
      <button
        v-if="selectedStart"
        type="button"
        class="h-datepicker__clear"
        :aria-label="lang('aria-clear-button')"
        @click="clearSelection"
      >
        {{ lang("clearButton") }}
      </button>
    </div>

    <div class="h-datepicker__months h_datepicker_months" :aria-label="lang('aria-application')">
      <article
        v-for="(month, index) in calendarMonths"
        :key="month.id"
        :ref="(element) => setMonthElement(element, index)"
        class="h-datepicker__month h_datepicker_month"
        :class="{
          'h_datepicker_one_month_display': calendarMonths.length === 1,
          'h_datepicker_two_month_display': calendarMonths.length === 2,
          'h_datepicker_month-1': index === 0,
          'h_datepicker_month-2': index === 1,
        }"
        :aria-labelledby="`${instanceId}-month-${month.id}`"
      >
        <header class="h-datepicker__month-header h_datepicker_month_control_panel">
          <button
            type="button"
            class="h-datepicker__month-control h_datepicker_month_control_btn"
            :class="{ 'h-datepicker__month-control--hidden': !month.prevBtn }"
            :disabled="!month.prevBtn"
            :aria-label="lang('aria-prev-month')"
            @click="goToPreviousMonth(index)"
          >
            <slot name="prev"><span aria-hidden="true">‹</span></slot>
          </button>

          <h2 :id="`${instanceId}-month-${month.id}`" class="h-datepicker__month-title h_datepicker_month_control_item" aria-live="polite">
            <slot name="month" :month="month">{{ month.name }} {{ month.year }}</slot>
          </h2>

          <button
            type="button"
            class="h-datepicker__month-control h_datepicker_month_control_btn"
            :class="{ 'h-datepicker__month-control--hidden': !month.nextBtn }"
            :disabled="!month.nextBtn"
            :aria-label="lang('aria-next-month')"
            @click="goToNextMonth(index)"
          >
            <slot name="next"><span aria-hidden="true">›</span></slot>
          </button>
        </header>

        <div class="h-datepicker__grid h_datepicker_month_box" role="grid" :aria-labelledby="`${instanceId}-month-${month.id}`">
          <div
            v-for="weekday in getWeekDayNames()"
            :key="weekday"
            class="h-datepicker__weekday h_datepicker_week_name"
            role="columnheader"
          >
            <slot name="weekday" :weekday="weekday">{{ weekday }}</slot>
          </div>

          <div
            v-for="day in month.days"
            :key="`${month.id}-${dateKey(day.date)}`"
            class="h-datepicker__cell"
            role="gridcell"
            :aria-selected="day.isSelected"
          >
            <button
              v-if="day.isCurrentMonth"
              type="button"
              class="h-datepicker__day h_datepicker_day"
              :class="{
                'h-datepicker__day--valid': day.isValid,
                'h-datepicker__day--invalid': !day.isValid,
                'h-datepicker__day--disabled': day.isDisabled && !day.isCheckOutEnabled,
                'h-datepicker__day--checkout-enabled': day.isCheckOutEnabled,
                'h-datepicker__day--selected': day.isSelected,
                'h-datepicker__day--range-start': day.isFirstDaySelected,
                'h-datepicker__day--range-end': day.isLastDaySelected,
                'h-datepicker__day--hovering': day.isHovering,
                'h-datepicker__day--today': day.isToday,
                'h_datepicker_valid': day.isValid,
                'h_datepicker_invalid': !day.isValid,
                'h_datepicker_disabled': day.isDisabled,
                'h_datepicker_checkout_enabled': day.isCheckOutEnabled,
                'h_datepicker_checkout_disabled': !day.isCheckOutEnabled,
                'h_datepicker_checkin_enabled': !day.isNoCheckIn,
                'h_datepicker_checkin_disabled': day.isNoCheckIn,
                'h_datepicker_before_disabled_date': day.isDayBeforeDisabledDate,
                'h_datepicker_first_day_selected': day.isFirstDaySelected,
                'h_datepicker_last_day_selected': day.isLastDaySelected,
                'h_datepicker_selected': day.isSelected,
                'h_datepicker_hovering': day.isHovering,
              }"
              :aria-disabled="!day.isValid"
              :tabindex="day.tabindex"
              :data-date="dateKey(day.date)"
              :aria-label="dayAriaLabel(day)"
              @click="selectDay(day)"
              @keydown="handleDayKeydown($event, day)"
              @pointerenter="showPopover($event, day)"
              @pointerleave="hidePopover"
            >
              <slot name="day" :day="day">
                <span>{{ day.day }}</span>
                <small v-if="day.isDayWithExtraText && extraDayText" class="h-datepicker__extra-text">
                  {{ extraDayText(day) }}
                </small>
              </slot>
            </button>
            <span v-else class="h-datepicker__day-placeholder" aria-hidden="true" />
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.h-datepicker,
.h-datepicker * {
  box-sizing: border-box;
}

.h-datepicker {
  --h-datepicker-accent: #0b6bcb;
  --h-datepicker-accent-strong: #084c8d;
  --h-datepicker-range: #dceeff;
  --h-datepicker-text: #172033;
  --h-datepicker-muted: #7c879c;
  --h-datepicker-border: #dce2ea;
  --h-datepicker-danger: #b42318;
  color: var(--h-datepicker-text);
  font-family: inherit;
  max-width: 1000px;
  min-width: 0;
  position: relative;
  width: 100%;
}

.h-datepicker__months {
  display: grid;
  gap: clamp(1rem, 3vw, 2.5rem);
  grid-template-columns: repeat(2, minmax(0, 1fr));
  min-width: 0;
  padding: clamp(0.75rem, 2vw, 1.5rem);
}

.h-datepicker__month { min-width: 0; }

.h-datepicker__month-header {
  align-items: center;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 2.75rem minmax(0, 1fr) 2.75rem;
  margin-bottom: 0.75rem;
}

.h-datepicker__month-title {
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
  text-align: center;
}

.h-datepicker__month-control,
.h-datepicker__clear,
.h-datepicker__day {
  appearance: none;
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  margin: 0;
}

.h-datepicker__month-control {
  align-items: center;
  border: 1px solid var(--h-datepicker-border);
  border-radius: 0.75rem;
  cursor: pointer;
  display: inline-flex;
  font-size: 1.75rem;
  height: 2.75rem;
  justify-content: center;
  padding: 0;
  transition: background-color 160ms ease, border-color 160ms ease;
  width: 2.75rem;
}

.h-datepicker__month-control:hover:not(:disabled) {
  background: #f2f6fa;
  border-color: #b8c3d1;
}

.h-datepicker__month-control--hidden { visibility: hidden; }

.h-datepicker__grid {
  display: grid;
  gap: 0.25rem;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.h-datepicker__weekday {
  align-items: center;
  color: var(--h-datepicker-muted);
  display: flex;
  font-size: 0.75rem;
  font-weight: 700;
  justify-content: center;
  min-height: 2rem;
  overflow: hidden;
  text-transform: uppercase;
}

.h-datepicker__cell { min-width: 0; }

.h-datepicker__day,
.h-datepicker__day-placeholder {
  align-items: center;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  height: clamp(2.75rem, 7vw, 4.25rem);
  justify-content: center;
  min-width: 0;
  position: relative;
  width: 100%;
}

.h-datepicker__day { transition: background-color 140ms ease, color 140ms ease, box-shadow 140ms ease; }
.h-datepicker__day--valid { cursor: pointer; }
.h-datepicker__day--valid:hover,
.h-datepicker__day--valid:focus-visible {
  background: #edf5fc;
  box-shadow: inset 0 0 0 2px var(--h-datepicker-accent);
  outline: none;
}
.h-datepicker__day--invalid { color: #a9b1bf; cursor: not-allowed; }
.h-datepicker__day--disabled { background: #fff0ee; color: #c77b72; text-decoration: line-through; }
.h-datepicker__day--selected,
.h-datepicker__day--hovering { background: var(--h-datepicker-range); border-radius: 0; color: var(--h-datepicker-text); }
.h-datepicker__day--range-start,
.h-datepicker__day--range-end { background: var(--h-datepicker-accent-strong); border-radius: 0.75rem; color: #fff; }
.h-datepicker__day--range-start:focus-visible,
.h-datepicker__day--range-end:focus-visible {
  background: var(--h-datepicker-accent-strong);
  box-shadow: inset 0 0 0 2px #fff, 0 0 0 2px var(--h-datepicker-accent);
}
.h-datepicker__day--checkout-enabled { background: #e7f5ec; color: #176c3a; text-decoration: none; }
.h-datepicker__day--today::after {
  background: currentColor;
  border-radius: 50%;
  bottom: 0.35rem;
  content: "";
  height: 0.25rem;
  position: absolute;
  width: 0.25rem;
}

.h-datepicker__extra-text {
  display: block;
  font-size: 0.65rem;
  line-height: 1;
  margin-top: 0.15rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.h-datepicker__popup {
  background: #0b253c;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.75rem;
  padding: 0.45rem;
  pointer-events: none;
  position: absolute;
  text-align: center;
  z-index: 5;
}
.h-datepicker__popup--error { background: var(--h-datepicker-danger); }

.h-datepicker__topbar {
  align-items: center;
  background: #f7f9fc;
  border: 1px solid var(--h-datepicker-border);
  border-radius: 0.75rem;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin: 0 clamp(0.75rem, 2vw, 1.5rem);
  padding: 0.75rem 1rem;
}
.h-datepicker__topbar--error { color: var(--h-datepicker-danger); }
.h-datepicker__clear { color: var(--h-datepicker-accent-strong); cursor: pointer; font-weight: 700; padding: 0.4rem; }
.h-datepicker--topbar-bottom { display: flex; flex-direction: column; }
.h-datepicker--topbar-bottom .h-datepicker__topbar { order: 2; }

.h-datepicker--mobile .h-datepicker__months {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-height: min(44rem, calc(100dvh - 1rem));
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-y: contain;
  padding: 0;
  scroll-behavior: smooth;
  scroll-padding-block: 0;
  scroll-snap-type: y proximity;
  scrollbar-gutter: stable;
  touch-action: pan-y;
}

.h-datepicker--mobile .h-datepicker__month {
  flex: 0 0 auto;
  padding: 1rem clamp(0.5rem, 3vw, 1rem);
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}

.h-datepicker--mobile .h-datepicker__month-header {
  background: #fff;
  background: color-mix(in srgb, Canvas 94%, transparent);
  grid-template-columns: minmax(0, 1fr);
  position: sticky;
  top: 0;
  z-index: 2;
}

.h-datepicker--mobile .h-datepicker__month-control {
  display: none;
}

.h-datepicker--mobile .h-datepicker__day,
.h-datepicker--mobile .h-datepicker__day-placeholder { height: clamp(2.75rem, 13vw, 3.75rem); }

@media (prefers-reduced-motion: reduce) {
  .h-datepicker *,
  .h-datepicker__months {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}

@media (max-width: 420px) {
  .h-datepicker__grid { gap: 0.125rem; }
  .h-datepicker__weekday { font-size: 0.68rem; }
}
</style>
