<script lang="ts">
  import {
    Button,
    DatePickerInput,
    DatePickerCalendar, 
    getISODate,
    Icon,
    Modal,
    TimePicker,
    getCurrentTime, 
    convertDateAndTimeToTimestamp,
    Table,
  } from "$lib/client/components";

  let time = $state(getCurrentTime());

  let showCalendar = $state(false);
  let date = $state(getISODate(new Date()));
  let isDateInvalid = $state(true);
  const validDateRangeStart = getISODate(new Date(new Date().setDate(5)));
  const validDateRangeEnd = getISODate(new Date(new Date().setDate(25)));
  let isDateOutOfRange = $state(true);
</script>

# Time Pickers

In addition to the `<TimePicker />` component, this component also exports a couple of convenient helper functions:

* `getCurrentTime()`: This function can be used to set the default time that is displayed in the component.
* `convertDateAndTimeToTimestamp()`: This function will take a date string (in `"YYYY-MM-DD"` format) and the value that is returned from the `value` prop in this component (which has this format `HH:MM:SS AM`) and convert those into a timestamp. This function returns an object with two properties:
    * `isoDateString`: This is an ISO date string with the form `YYYY-MM-DDTHH:mm:ss.sssZ`, which is in UTC time.
    * `localDateObj`: This is a Date object, which is expressed in standard format and local time. 
* The `value`s that are returned from the `<DatePickerInput />` component and this `<Timepicker />` component can be passed to the `convertDateAndTimeToTimestamp()` function. (See the example below.)

---


## Example Usage

<div class="components-container">
  <div class="date-picker-container">
    <div class="input-btn-group">
      <DatePickerInput
        bind:value={date}
        bind:isInvalidFormat={isDateInvalid}
        validDateRange={[validDateRangeStart, validDateRangeEnd]}
        bind:isOutOfRange={isDateOutOfRange}
      />
      <Button
        aria-label="Click to change date with calendar component"
        onclick={() => showCalendar = !showCalendar}
      >
        <Icon icon="mdi:calendar" width="20" />
      </Button>
    </div>
    {#if showCalendar}
      <Modal
        scrollingBody={false}
        showCloseBtn={true}
        closeModal={() => showCalculatorModal = false}
        modalBackgroundColor="transparent"
      >
        {#snippet modalBody()}
          <DatePickerCalendar
            value={date}
            validDateRange={[validDateRangeStart, validDateRangeEnd]}
            setDate={(updatedDate) => {
              console.log("UPDATED DATE:", updatedDate);
              date = updatedDate;
            }}
            hideCalendar={() => showCalendar = false} 
          />
        {/snippet}
      </Modal>
    {/if}
  </div>
  <div class="time-picker-container">
    <TimePicker bind:value={time} />
  </div>
</div>

<br>

<p>Time: <code>{time}</code></p>

<p>ISO Date String (UTC Time): <code>{ convertDateAndTimeToTimestamp(date, time).isoDateString }</code></p>

<p>Standard Date Object (Local Time): <code>{ convertDateAndTimeToTimestamp(date, time).localDateObj }</code></p>

```svelte
<script lang="ts">
  import {
    Button,
    DatePickerInput,
    DatePickerCalendar, 
    getISODate,
    Icon,
    Modal,
    TimePicker,
    getCurrentTime, 
    convertDateAndTimeToTimestamp 
  } from "$lib/client/components";

  let time = $state(getCurrentTime());

  let showCalendar = $state(false);
  let date = $state(getISODate(new Date()));
  let isDateInvalid = $state(true);
  const validDateRangeStart = getISODate(new Date(new Date().setDate(5)));
  const validDateRangeEnd = getISODate(new Date(new Date().setDate(25)));
  let isDateOutOfRange = $state(true);
</script>

<div class="components-container">
  <div class="date-picker-container">
    <div class="input-btn-group">
      <DatePickerInput
        bind:value={date}
        bind:isInvalidFormat={isDateInvalid}
        validDateRange={[validDateRangeStart, validDateRangeEnd]}
        bind:isOutOfRange={isDateOutOfRange}
      />
      <Button
        aria-label="Click to change date with calendar component"
        onclick={() => showCalendar = !showCalendar}
      >
        <Icon icon="mdi:calendar" width="20" />
      </Button>
    </div>
    {#if showCalendar}
      <Modal
        scrollingBody={false}
        showCloseBtn={true}
        closeModal={() => showCalculatorModal = false}
        modalBackgroundColor="transparent"
      >
        {#snippet modalBody()}
          <DatePickerCalendar
            value={date}
            validDateRange={[validDateRangeStart, validDateRangeEnd]}
            setDate={(updatedDate) => {
              console.log("UPDATED DATE:", updatedDate);
              date = updatedDate;
            }}
            hideCalendar={() => showCalendar = false} 
          />
        {/snippet}
      </Modal>
    {/if}
  </div>
  <div class="time-picker-container">
    <TimePicker bind:value={time} />
  </div>
</div>

<p>Time: <code>{time}</code></p>

<p>ISO Date String (UTC Time): <code>{ convertDateAndTimeToTimestamp(date, time).isoDateString }</code></p>

<p>Standard Date Object (Local Time): <code>{ convertDateAndTimeToTimestamp(date, time).localDateObj }</code></p>

<style>
  .components-container {
    display: flex;
    align-items: center;
    gap: var(--size-4);

    & .date-picker-container {

      & .input-btn-group {
        width: 175px;
        display: flex;
        gap: 3px;
      }
    }
  }
</style>
```

---

## Props

<Table
  border={false}
  header={[
    [
      "Prop name",
      "Type", 
      "Possible values",
      "Default value", 
      "Description",
    ],
  ]}
  body={[
    [
      "<code>bind:value</code>",
      "<code>string</code>",
      "A string with this format `HH:MM:SS AM`",
      "none",
      "The time that is entered into this component will be bound to the variable that is passed to this prop. Refer to the examples for ideas on how to set the default value to today’s date.",
    ],
    [
      "<code>colors</code>",
      {
        data: 'See <a href="/docs#colors" class="table-link">colors</a>.',
        colspan: 4,
      },
    ],
    [
      "<code>sizes</code>",
      {
        data: 'See <a href="/docs#sizes" class="table-link">sizes</a>.',
        colspan: 4,
      },
    ],
    [
      "<code>showHr</code>,<br><code>showMin</code>,<br><code>showSec</code>,<br><code>showAMPM</code>",
      "<code>boolean</code>",
      "<code>true</code>, <code>false</code>",
      "<code>true</code>",
      "You can show/hide individual time parts of this component with the <code>showHr</code>, <code>showMin</code>, <code>showSec</code>, and <code>showAMPM</code> props. Each part of this component is shown by default. If you wanted to hide the seconds, for example, you would pass <code>showSec={false}</code>.",
    ],
  ]}
/>

<style>
  .components-container {
    display: flex;
    align-items: center;
    gap: var(--size-4);

    & .date-picker-container {

      & .input-btn-group {
        width: 175px;
        display: flex;
        gap: 3px;
      }
    }
  }
</style>
