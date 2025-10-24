<script lang="ts">
  import { scale } from "svelte/transition";
  import { 
    Button, 
    DatePickerInput, 
    DatePickerCalendar, 
    getISODate,
    Icon,
    Link,
    Modal,
    TabsContainer, 
    TabBar, 
    Tab, 
    TabPanel 
  } from "$lib/client/components";


  let date = $state(getISODate(new Date()));
  let isDateInvalid = $state(true);
  // This is the 5th of the current month.
  const validDateRangeStart = getISODate(new Date(new Date().setDate(5)));
  // This is the 25th of the current month.
  const validDateRangeEnd = getISODate(new Date(new Date().setDate(25)));
  let isDateOutOfRange = $state(true);

  let calendarDate = $state(getISODate(new Date()));

  let showCalendarTransition = $state(false);
  let dateTransition = $state(getISODate(new Date()));
  let isDateInvalidTransition = $state(true);
  const validDateRangeStartTransition = getISODate(new Date(new Date().setDate(5)));
  const validDateRangeEndTransition = getISODate(new Date(new Date().setDate(25)));
  let isDateOutOfRangeTransition = $state(true);

  let showCalendarModal = $state(false);
  let dateModal = $state(getISODate(new Date()));
  let isDateInvalidModal = $state(true);
  const validDateRangeStartModal = getISODate(new Date(new Date().setDate(5)));
  const validDateRangeEndModal = getISODate(new Date(new Date().setDate(25)));
  let isDateOutOfRangeModal = $state(true);

  let newDateObject = $state(new Date("2025-09-20"));
</script>


# Date Picker


The `<DatePickerInput />` component takes an ISO date string in the form `YYYY-MM-DD` and returns a date string of the same form.

There are a few extra helper functions that can be used along with the `<DatePickerInput />` and `<DatePickerCalendar />` components:

1. The `getISODate()` helper function, which takes a `new Date()` object and can be used to set the initial/default value of the DatePicker components.
2. The `getFirstDayOfMonth()` helper function, which takes a year (number) and month (number) and returns a new Date object representing the first day of the specified month. This can be used to set the `valideDateRange`.
3. The `getLastDayOfMonth()` helper function, which takes a year (number) and month (number) and returns a new Date object representing the last day of the specified month. This can be used to set the `valideDateRange`.

---

## Example Usage

**IMPORTANT:** If you have multiple calendars showing on a page at once, then you will get conflicts between calendars. So do not use the `<DatePickerCalendar />` unless you hide it with an `{#if ...}` block, as shown in the examples below.

<br>

### Show/Hide Calendar with Transition

<div class="calendar-group">
  <div class="input-btn-group">
    <DatePickerInput
      bind:value={dateTransition}
      bind:isInvalidFormat={isDateInvalidTransition}
      validDateRange={[validDateRangeStartTransition, validDateRangeEndTransition]}
      bind:isOutOfRange={isDateOutOfRangeTransition}
    />
    <Button
      aria-label="Click to change date with calendar component"
      onclick={() => showCalendarTransition = !showCalendarTransition}
    >
      <Icon icon="mdi:calendar" width="20" />
    </Button>
  </div>
  {#if showCalendarTransition}
    <div class="calendar-container-outer" transition:scale>
      <div class="calendar-container-inner">
        <DatePickerCalendar
          value={dateTransition}
          validDateRange={[validDateRangeStartTransition, validDateRangeEndTransition]}
          setDate={(updatedDate) => {
            dateTransition = updatedDate;
          }}
          hideCalendar={() => showCalendarTransition = false} 
        />
      </div>
    </div>
  {/if}
</div>
{#if isDateInvalidTransition}
  <div class="invalid-error-wrapper">
    <span class="invalid-error-msg">Date Format: YYYY-MM-DD</span>
  </div>
{/if}
{#if isDateOutOfRangeTransition}
  <div class="invalid-error-wrapper">
    <span class="invalid-error-msg">Date should be between {validDateRangeStartTransition} and {validDateRangeEndTransition}</span>
  </div>
{/if}

<br>

This is the value that is returned from this component (it is a string data type): <code>{dateTransition}</code>

```svelte
<script lang="ts">
  import { scale } from "svelte/transition";
  import { 
    Button, 
    DatePickerInput, 
    DatePickerCalendar, 
    getISODate,
    Icon,
  } from "$lib/client/components";

  let showCalendarTransition = $state(false);
  let dateTransition = $state(getISODate(new Date()));
  let isDateInvalidTransition = $state(true);
  const validDateRangeStartTransition = getISODate(new Date(new Date().setDate(5)));
  const validDateRangeEndTransition = getISODate(new Date(new Date().setDate(25)));
  let isDateOutOfRangeTransition = $state(true);
</script>

<div class="calendar-group">
  <div class="input-btn-group">
    <DatePickerInput
      bind:value={dateTransition}
      bind:isInvalidFormat={isDateInvalidTransition}
      validDateRange={[validDateRangeStartTransition, validDateRangeEndTransition]}
      bind:isOutOfRange={isDateOutOfRangeTransition}
    />
    <Button
      aria-label="Click to change date with calendar component"
      onclick={() => showCalendarTransition = !showCalendarTransition}
    >
      <Icon icon="mdi:calendar" width="20" />
    </Button>
  </div>
  {#if showCalendarTransition}
    <div class="calendar-container-outer" transition:scale>
      <div class="calendar-container-inner">
        <DatePickerCalendar
          value={dateTransition}
          validDateRange={[validDateRangeStartTransition, validDateRangeEndTransition]}
          setDate={(updatedDate) => {
            dateTransition = updatedDate;
          }}
          hideCalendar={() => showCalendarTransition = false} 
        />
      </div>
    </div>
  {/if}
</div>
{#if isDateInvalidTransition}
  <div class="invalid-error-wrapper">
    <span class="invalid-error-msg">Date Format: YYYY-MM-DD</span>
  </div>
{/if}
{#if isDateOutOfRangeTransition}
  <div class="invalid-error-wrapper">
    <span class="invalid-error-msg">Date should be between {validDateRangeStartTransition} and {validDateRangeEndTransition}</span>
  </div>
{/if}

<style>
  .calendar-group {
    width: 350px;

    & .input-btn-group {
      display: flex;
      gap: 5px;
    }

    & .calendar-container-outer {
      position: relative;
      display: flex;
      justify-content: flex-end;
      z-index: 100;

      & .calendar-container-inner {
        position: absolute;
        top: 5px;
        border-radius: var(--radius);
        box-shadow: var(--box-shadow-depth);
      }
    }
  }

  .invalid-error-wrapper {
    position: relative;
    margin-top: 7px;
  }
    
  .invalid-error-msg {
    position: absolute;
    padding: 5px 10px;
    border-radius: 3px;
    background-color: var(--dark-red);
    color: var(--white);
    font-weight: bold;
  }
</style>
```

If you want to limit the date range, then you can do that with the `validDateRange` prop. For example, if you want to limit the date range to a single month, such as the current month, then you could do something like the following example. (If you do not want to limit the date range, then do not pass anything to the `validDateRange` prop.)

```svelte
<script>
  import { 
    DatePickerInput,
    getISODate,
    getFirstDayOfMonth,
    getLastDayOfMonth,
  } from "$lib/client/components";

  const currentYear = new Date().getFullYear();
  const currentMonthNumber = new Date().getMonth();
  const validDateRangeStart = getISODate(getFirstDayOfMonth(currentYear, currentMonthNumber));
  const validDateRangeEnd = getISODate(getLastDayOfMonth(currentYear, currentMonthNumber));
</script>

<DatePickerInput
  validDateRange={[validDateRangeStart, validDateRangeEnd]}
/>
```

<br><br>

### Show/Hide Calendar with Modal

<div class="input-btn-group">
  <DatePickerInput
    bind:value={dateModal}
    bind:isInvalidFormat={isDateInvalidModal}
    validDateRange={[validDateRangeStartModal, validDateRangeEndModal]}
    bind:isOutOfRange={isDateOutOfRangeModal}
  />
  <Button
    aria-label="Click to change date with calendar component"
    onclick={() => showCalendarModal = !showCalendarModal}
  >
    <Icon icon="mdi:calendar" width="20" />
  </Button>
</div>
{#if showCalendarModal}
  <Modal
    scrollingBody={false}
    showCloseBtn={true}
    closeModal={() => showCalculatorModal = false}
    modalBackgroundColor="transparent"
  >
    {#snippet modalBody()}
      <DatePickerCalendar
        value={dateModal}
        validDateRange={[validDateRangeStartModal, validDateRangeEndModal]}
        setDate={(updatedDate) => {
          dateModal = updatedDate;
        }}
        hideCalendar={() => showCalendarModal = false} 
      />
    {/snippet}
  </Modal>
{/if}
{#if isDateInvalidModal}
  <div class="invalid-error-wrapper">
    <span class="invalid-error-msg">Date Format: YYYY-MM-DD</span>
  </div>
{/if}
{#if isDateOutOfRangeModal}
  <div class="invalid-error-wrapper">
    <span class="invalid-error-msg">Date should be between {validDateRangeStartModal} and {validDateRangeEndModal}</span>
  </div>
{/if}

<br>

```svelte
<script lang="ts">
  import { 
    Button, 
    DatePickerInput, 
    DatePickerCalendar, 
    getISODate,
    Icon,
    Modal,
  } from "$lib/client/components";

  let showCalendarModal = $state(false);
  let dateModal = $state(getISODate(new Date()));
  let isDateInvalidModal = $state(true);
  const validDateRangeStartModal = getISODate(new Date(new Date().setDate(5)));
  const validDateRangeEndModal = getISODate(new Date(new Date().setDate(25)));
  let isDateOutOfRangeModal = $state(true);
</script>

<div class="input-btn-group">
  <DatePickerInput
    bind:value={dateModal}
    bind:isInvalidFormat={isDateInvalidModal}
    validDateRange={[validDateRangeStartModal, validDateRangeEndModal]}
    bind:isOutOfRange={isDateOutOfRangeModal}
  />
  <Button
    aria-label="Click to change date with calendar component"
    onclick={() => showCalendarModal = !showCalendarModal}
  >
    <Icon icon="mdi:calendar" width="20" />
  </Button>
</div>
{#if showCalendarModal}
  <Modal
    scrollingBody={false}
    showCloseBtn={true}
    closeModal={() => showCalculatorModal = false}
    modalBackgroundColor="transparent"
  >
    {#snippet modalBody()}
      <DatePickerCalendar
        value={dateModal}
        validDateRange={[validDateRangeStartModal, validDateRangeEndModal]}
        setDate={(updatedDate) => {
          dateModal = updatedDate;
        }}
        hideCalendar={() => showCalendarModal = false} 
      />
    {/snippet}
  </Modal>
{/if}

<style>
  .input-btn-group {
    width: 350px;
    display: flex;
    gap: 5px;
  }
</style>
```

<br>

## NOTES

* Users can directly enter a date value into the input field or select a date from the calendar that pops up. 
* If a user enters a date into the input field that does not match the `YYYY-MM-DD` format, then a validation error is triggered.
* If you want to set the initial/default value to today's date, then use the `getISODate()` function that is exported along with this component and pass a `new Date()` object to it. See the examples above for details.
* The `<DatePickerInput />` component is designed to fill the entire width of its parent element. So, for example, you can put a wrapper `<div>` element around the `<DatePickerInput />` component and put a `width` on the `<div>` and the `<DatePickerInput />` component will be as wide as the `<div>` wrapper. See the example above.
* The value that is returned from this component is a `string` in ISO date format. For example: <code>{date}</code>

---

## Props

<TabsContainer>
  <TabBar>
    <Tab>Both Components</Tab>
    <Tab>DatePickerInput</Tab>
    <Tab>DatePickerCalendar</Tab>
  </TabBar>

  <TabPanel>
    <h2>Both Components</h2>

    <div></div>

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `bind:value` | `string` | A string with in ISO date format (`YYYY-MM-DD`) or an empty string (`""`) | Today's date in ISO string format (`YYYY-MM-DD`) | The date that is entered into the input field or that is selected in the calendar will be bound to the variable that is passed to this prop.<br><br>Refer to the examples for ideas on how to set the default value to today's date. |
    | `validDateRange` | A two-element array of date `string`s | An array with any two string values that use the `YYYY-MM-DD` format. | `[]` (an empty array) | This prop takes a two-element array of strings: (1) start date, (2) end date. Each date string should have this format: `YYYY-MM-DD`. These dates indicate the range of dates that can be selected or typed into the date picker.<br><br> - If this prop is not set, then all dates are valid and can be selected or entered.<br> - If both dates are set, then all dates between the start and end dates (inclusive) will be valid, but any dates outside of that range will be invalid.<br> - If only the start date is set, then all dates including the start date and after are valid and all dates before the start date are invalid.<br> - If only the end date is set, then all dates include the end date and before are valid and all dates after the end date are invalid.  |

    </div>

  </TabPanel>

  <TabPanel>
    <h2>DatePickerInput</h2>

    <div></div>

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `bind:isInvalidFormat`<br>*(optional)* | `boolean` | `true`, `false` | `true` | This prop indicates whether the text that has been entered into the input field is a valid date and/or is formatted correctly. The variable that is bound to this prop will be set to `true` if the date is invalid and `false` otherwise. This can be used to display an error message if the date that was entered is not valid, as shown in the first example.<br><br>Note that if you bind the `value` prop to a variable that equals a valid date, for example `let date = $state(getISODate(new Date()))`, then the date that is initially set in the `<DatePickerInput />` field will be a valid date. That also means that the date will be valid initially, even if you set the variable that is bound to `isInvalidFormat` to equal `true`.<br><br>NOTE: Although this will validate the text that is entered into the `<DatePickerInput />` input field, it would probably be preferable to run all your validations through a validation library, like Superstruct, Zod, or Yup. |
    | `bind:isOutOfRange`<br>*(optional)* | `boolean` | `true`, `false` | `true` | This prop will return `true` when the selected date is outside of the `validDateRange` and `false` otherwise. |
    | `colors` | See <a href="/docs#colors" class="table-link">colors</a>. ||||
    | `sizes` | See <a href="/docs#sizes" class="table-link">sizes</a>. ||||
    | `placeholder`<br>*(optional)* | `string` | Any string | `YYYY-MM-DD` | This prop will set the placeholder when the date value is an empty string (`""`). |
    | `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the `<DatePickerInput />` component. |

    </div>

  </TabPanel>

  <TabPanel>
    <h2>DatePickerCalendar</h2>

    <div></div>

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `setDate` | Callback Prop | A callback function | NA | The callback function that you pass to this prop should set the date variable that is bound to the `value` prop. See the examples for details. |
    | `hideCalendar` | Callback Prop | A callback function | NA | The callback function that you pass to this prop should hide the calendar. See the examples for details. |

    </div>

  </TabPanel>


</TabsContainer>


<style>
  .calendar-group {
    width: 350px;

    & .input-btn-group {
      display: flex;
      gap: 5px;
    }

    & .calendar-container-outer {
      position: relative;
      display: flex;
      justify-content: flex-end;
      z-index: 100;

      & .calendar-container-inner {
        position: absolute;
        top: 5px;
        border-radius: var(--radius);
        box-shadow: var(--box-shadow-depth);
      }
    }
  }

  .input-btn-group {
    width: 350px;
    display: flex;
    gap: 5px;
  }

  .invalid-error-wrapper {
    position: relative;
    margin-top: 7px;
  }
    
  .invalid-error-msg {
    position: absolute;
    padding: 5px 10px;
    border-radius: 3px;
    background-color: var(--dark-red);
    color: var(--white);
    font-weight: bold;
  }
</style>
