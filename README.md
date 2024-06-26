# vue3-hotel-datepicker

A [Vue.js](https://vuejs.org/) date range picker oriented on hotel, apartment and other accommodations. 
Its just picker and not include modals or other implementations to prevent size overload, in most cases you already have modals implementation and can easy use it with this picker.
Vue hotel datepicker provide date range selecting, minimum and maximum night limitation, custom methods for date restriction, and disabled dates. Ssr supported nuxt3 friendly.

## Demo

### Live demo
[https://vue3-hotel-datepicker.sebarkar.tech/](https://vue3-hotel-datepicker.sebarkar.tech/)

### Desktop screen preview
<img style="border-radius: 6px; box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.27);" src="https://vue3-hotel-datepicker.sebarkar.tech/main.png" />

### Mobile screen preview
<img style="border-radius: 6px; box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.27);" src="https://vue3-hotel-datepicker.sebarkar.tech/main2.png" />

## Installation

Use ```npm``` or ```yarn``` for installation
```bash
$ npm install @sebarkar/vue3-hotel-datepicker
# OR
$ yarn add @sebarkar/vue3-hotel-datepicker
```

## Usage

Method 1: Import component in `.vue` file

```vue
<template>
    <Vue3HotelDatePicker />
</template>

<script>
    import Vue3HotelDatePicker from "@sebarkar/vue3-hotel-datepicker";
    import '@sebarkar/vue3-hotel-datepicker/dist/style.css' // Can be overrided by your own css
</script>
```
## Props/Options

### format
- Type: `String`
- Default: `'YYYY-MM-DD'`

Format for all props date values that you pass to the component.

### startOfWeek

- Type: `String`
- Default: `'monday'`

Start day of the week. Possible values: `'sunday'`, `'monday'`.

### selectedDates

- Type: `Array` or `Boolean`
- Default: `false`

Add a range of dates to be selected by default. The array must contain two dates in the format specified by the `format` prop.
Example []
```javascript
['2024-01-01', '2024-01-10']
```

### minDate

- Type: `Date` or `String`
- Default: today midnight.

The start view date. All the dates before this date will be disabled.

### maxDate

- Type: `Date` or `String` or `Boolean`
- Default: `false`

The end view date. All the dates after this date will be disabled.

### disabledDaysOfWeek

- Type: `Array`
- Default: `0`

Disabled check in days of the week. Possible values: 
```javascript
['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
```

### moveBothMonths
**Not implemented yet**

- Type: `Boolean`
- Default: `false`
Move both month by clicking on the button change month.

### noCheckOutDates

- Type: `Array`
- Default: `[]`
Disabled check out dates. All the dates passed to the list can not be selected as a end range.

### noCheckInDates

- Type: `Array`
- Default: `[]`
  Disabled check in dates. All the dates passed to the list can not be selected as a start range.
  Example []
```javascript
['2024-01-01', '2024-01-10']
```

### noCheckInDaysOfWeek

- Type: `Array`
- Default: `[]`
  Disabled check in weekdays. All the dates passed to the list can not be selected as a start range.
  Example []
```javascript
['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
```

### noCheckOutDaysOfWeek

- Type: `Array`
- Default: `[]`
  Disabled check in weekdays. All the weekdays passed to the list can not be selected as a end range.
  Example []
```javascript
['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
```

### disabledDates

- Type: `Array`
- Default: `[]`

Useful for reservation dates. An array of strings by props format value, default `'YYYY-MM-DD'` (as same as default `format`). All the dates passed to the list can not be selected as a start and end date.
Example []
```javascript
['2024-01-01', '2024-01-10']
```

### maxNights
- Type: `Number`
- Default: `0`
- Maximum nights that can be selected.

### minNights
- Type: `Number`
- Default: `1`
- Minimum nights that can be selected.

### singleMonthBreakpoint
// Works for detect button next and prev display and display months (for ssr needs additional css settings)
- Type: `Number` or `String`
- Default: `768`
- Example 768 - after 768px width of window, the date picker will show 2 months.
- Available only in browser.
- For SSR prevent Node mismatch buttons and months display will load only in onMounted hook. 
- Component use css properties set 768 and less hide second month to prevent jumping content.

### selectForward 
- Type: `Boolean`
- Default: `false`
- Available selection forward only.

### showSingleMonth
- Type: `Boolean`
- Default: `false`
Show only one month mode

### enableCheckout
- Type: `Boolean`
- Default: `false`
  Enable checkout first day disabledDates.

### weekDays
- Type: `Array`
- Default: `["sun", "mon", "tue", "wed", "thu", "fri", "sat"]`
- Can be used for i18n

### monthNames
- Type: `Array`
- Default: `["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]`
- Can be used for i18n

### i18n
- Type: `Object`
- Default: 
```javacript 
  {
    'not selected' : 'Not selected',
    'night': 'Night',
    'nights': 'Nights',
  }
  ```
- i18n Object for the component

## Events

### selected
When a new date is selected, ```Vue3HotelDatepicker``` will emit an event ```update```, passing the Timestamp range array of strings to parent component.

Date range Object example:
Timestamp format can be easy converted to date format by using `new Date(1713906000)`

```javacript
{
    start: '1713906000',
    end: '1714078800'
}
```

## Slots
### weekday
- Return: `String`
- example: `thu`

### popup
- Return: `Number` // Days count selected
- default: `<<` or `>>`

### prev `or` next
- Custom btn control implementation

### day
- Return: `Object`
- example: 
```javascript
    {
        date: Date, 
        type: 'visibleMonth'
        day: Date.getDate(), // 1-31
        time: Date.getTime(), // timestamp
        isCurrentMonth: true, // is current month
        isValid: true, // is valid for selection
        disabled: false, // disabled for selection
        isNoCheckIn: false, // not valid check in date
        isNoCheckOut: false, // not valid check out date
    }
```
- example implimentation:
```vue
<script setup>
    const prices = [
        ...Array.from({length: 70}, (_, i) => i + 1).map(i => (Math.floor(Math.random() * (100 - 80) + 80)))
    ]
</script>

<Vue3HotelDatePicker>
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
</Vue3HotelDatePicker>
```


### weekday


### reset (Not implemented yet)
When the reset button is clicked, ```Vue3HotelDatepicker``` will emit an event ```reset```.

## License
[MIT License](http://opensource.org/licenses/MIT)
