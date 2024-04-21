<script setup lang="ts">
import Vue3HotelDatePicker from "@/components/Vue3HotelDatePicker.vue";
import { Icon } from '@iconify/vue';
import { eachDayOfInterval, addDays, differenceInCalendarDays, endOfMonth, addMonths, format } from "date-fns";
import {ref} from "vue";

const busyDates = () => {
  let now = new Date();
  let monthEndDate = endOfMonth(new Date());
  let difference = differenceInCalendarDays(monthEndDate, now);

  if (difference < 17) {
    now = new Date(addMonths(now, 1).setDate(1));
  }

  let startOfPeriod = addDays(now, 5);
  let endOfPeriod = addDays(now, 10);

  let startOfPeriod2 = addDays(now, 13);
  let endOfPeriod2 = addDays(now, 15);

  let result = eachDayOfInterval({start: startOfPeriod, end: endOfPeriod}).map(date => format(date, 'yyyy-MM-dd'));
  let result2 = eachDayOfInterval({start: startOfPeriod2, end: endOfPeriod2}).map(date => format(date, 'yyyy-MM-dd'));

  return [...result, ...result2];
}

const selectedDates = [
    format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    format(addDays(new Date(), 6), 'yyyy-MM-dd')
]

const translation = {
  calendar: {
    months: {
      January: 'Enero',
      February: 'Febrero',
      March: 'Marzo',
      April: 'Abril',
      May: 'Mayo',
      June: 'Junio',
      July: 'Julio',
      August: 'Agosto',
      September: 'Septiembre',
      October: 'Octubre',
      November: 'Noviembre',
      December: 'Diciembre',
    },
    weekdays: {
      sun: 'Dom',
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mié',
      thu: 'Jue',
      fri: 'Vie',
      sat: 'Sáb',
    },
    nights: (nights) => nights === 0 ? 'Selecciona otro día\'' : (nights === 1 ? '1 noche' : `${nights} noches`),
  }
}

const prices = [
    ...Array.from({length: 70}, (_, i) => i + 1).map(i => (Math.floor(Math.random() * (100 - 80) + 80)))
]

const lang = ref( 'en')

const script1 = '';

const code1 = '<template>\n' +
    '      <Vue3HotelDatePicker\n' +
    '          :start-date="selectedDates[0]"\n' +
    '          :end-date="selectedDates[1]"\n' +
    '          :single-month-breakpoint="768"\n' +
    '          enable-checkout\n' +
    '      >\n' +
    '        <template v-slot:day="{ day }">\n' +
    '          <div class="calendar_day">\n' +
    '            {{day.day}}\n' +
    '            <span\n' +
    '                v-if="day.isValid && !day.disabled"\n' +
    '                :class="prices[day.day] < 85 ? \'text-green\' : \'text-red\'"\n' +
    '                class="text-small"\n' +
    '            >{{ prices[day.day] }}$</span>\n' +
    '          </div>\n' +
    '        </template>\n' +
    '        <template #next>\n' +
    '          <div class="control_btn">\n' +
    '            <Icon icon="octicon:arrow-right-16"/>\n' +
    '          </div>\n' +
    '        </template>\n' +
    '        <template #prev>\n' +
    '          <div class="control_btn">\n' +
    '            <Icon icon="octicon:arrow-left-16"/>\n' +
    '          </div>\n' +
    '        </template>\n' +
    '        <template v-slot:popup="{ nights }">\n' +
    '          <div class="popup_container">\n' +
    '            <Icon icon="material-symbols:mode-night-outline"/>\n' +
    '            {{nights}}\n' +
    '          </div>\n' +
    '        </template>\n' +
    '      </Vue3HotelDatePicker>\n' +
    '</template>'

</script>

<template>
  <div>
    <h1>Components</h1>
    <div class="wrapper">
      <h2 class="w-full">Selected Dates</h2>
      <Vue3HotelDatePicker
          :start-date="selectedDates[0]"
          :end-date="selectedDates[1]"
          :single-month-breakpoint="768"
          enable-checkout
      />
    </div>
    <div class="wrapper">
      <h2 class="w-full">Translation with slots</h2>
      <Vue3HotelDatePicker
          :start-date="selectedDates[0]"
          :end-date="selectedDates[1]"
          :single-month-breakpoint="768"
          enable-checkout
      >
        <template v-slot:popup="{ nights }">
          {{ translation['calendar']['nights'](nights) }}
        </template>
        <template v-slot:month="{ month }">
          {{ translation['calendar']['months'][month.name] }} {{ month.year }}
        </template>
        <template v-slot:weekday="{ weekday }">
          {{translation['calendar']['weekdays'][weekday] }}
        </template>
      </Vue3HotelDatePicker>
    </div>
    <div class="wrapper">
      <h2 class="w-full">Busy Dates (check out first disabled date = ALLOWED)</h2>
      <Vue3HotelDatePicker
          :single-month-breakpoint="768"
          :disabled-dates="busyDates()"
          enable-checkout
      />
    </div>
    <div class="wrapper">
      <h2 class="w-full">Busy Dates (check out first disabled date = FORBIDDEN)</h2>
      <Vue3HotelDatePicker
          :single-month-breakpoint="768"
          :disabled-dates="busyDates()"
      />
    </div>
    <div class="wrapper">
      <h2 class="w-full">Single month breakpoint</h2>
      <Vue3HotelDatePicker
          :single-month-breakpoint="768"
      />
    </div>

    <div class="wrapper">
      <h2 class="w-full">Next/prev/day/popup slots</h2>
      <Vue3HotelDatePicker
          :start-date="selectedDates[0]"
          :end-date="selectedDates[1]"
          :single-month-breakpoint="768"
          enable-checkout
      >
        <template v-slot:day="{ day }">
          <div class="calendar_day">
            {{day.day}}
            <span
                v-if="day.isValid && !day.disabled"
                :class="prices[day.day] < 85 ? 'text-green' : 'text-red'"
                class="text-small"
            >{{ prices[day.day] }}$</span>
          </div>
        </template>
        <template #next>
          <div class="control_btn">
            <Icon icon="octicon:arrow-right-16"/>
          </div>
        </template>
        <template #prev>
          <div class="control_btn">
            <Icon icon="octicon:arrow-left-16"/>
          </div>
        </template>
        <template v-slot:popup="{ nights }">
          <div class="popup_container">
            <Icon icon="material-symbols:mode-night-outline"/>
            {{nights}}
          </div>
        </template>
      </Vue3HotelDatePicker>
      <highlightjs
          class="code_block"
          language="js"
          :code="script1"
      />
      <highlightjs
          class="code_block"
          language="js"
          :code="code1"
      />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  padding: 0 10px;
  background-color: beige;
}

.code_block {
  text-align: start;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 14px;
  background-color: #f4f4f4;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
  overflow-x: auto;
}

.calendar_day {
  pointer-events: none;
}

.popup_container {
  display: flex;
  justify-content: center;
  align-items: center;

}

.control_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 8px;
  color: white;
  background-color: #0b253c;
  pointer-events: none;
}

.text-small {
  font-size: 11px;
  width: 100%;
  font-weight: bold;
  text-align: center;
  display: block;
}

.w-full {
  width: 100%;
}

.text-green {
  color: green;
}
</style>

