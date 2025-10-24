<script lang="ts">
  import { onMount, tick } from "svelte";
  import { Icon } from "../Icons";
  import { getDateObjFromISODate, getISODateFromDateObj, isDateFormatInvalid, isDateOutOfRange } from "./utils";

  interface Props {
    value?: string;
    validDateRange?: string[];
    setDate: (date: string) => void;
    hideCalendar: () => void;
  }

  let {
    value = $bindable(""),
    validDateRange = [],
    setDate,
    hideCalendar,
  }: Props = $props();

  let activeCalendar = $state();
  let dialogWidth = $state(350); // Default width for desktop screens.
  let dialogHeight = $state(26.75); // Default height for 6 weeks of dates.

  let focusDay = $state(value);

  // If the value that the user enters into the input field is an empty string or is not a valid date, then set `focusDay` to today's date so the calendar will display properly. NOTE: Since `focusDay` will be set to today's date, the date will be set/highlighted in this <Calendar /> component only and the input field will remain blank.
  // NOTE: An empty date field is a valid input.
  $effect(() => {
    if (value === "" || isDateFormatInvalid(focusDay)) {
      focusDay = getISODateFromDateObj(new Date());
    }
  });

  let cancelBtn = $state();
  let okBtn = $state();
  let nextYearBtn = $state();

  let monthYearHeading = $state("");
  let dialogMessage = $state("Cursor keys can navigate dates");

  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dates = $state([]);
  // The `dates` array will have 5 or 6 nested arrays, where each nested array represents one week.
  // Each nested week array will have 7 objects, where each object represents a date.
  // This is an example:
  // let dates = [
  //   [
  //     { isoDate: "2020-01-26", date: 26, outOfMonth: true, outOfRange: true },
  //     { isoDate: "2020-01-27", date: 27, outOfMonth: true, outOfRange: true },
  //     { isoDate: "2020-01-28", date: 28, outOfMonth: true, outOfRange: true },
  //     { isoDate: "2020-01-29", date: 29, outOfMonth: true, outOfRange: true },
  //     { isoDate: "2020-01-30", date: 30, outOfMonth: true, outOfRange: true },
  //     { isoDate: "2020-01-31", date: 31, outOfMonth: true, outOfRange: true },
  //     { isoDate: "2020-02-01", date: 1, outOfMonth: false, outOfRange: true },
  //   ],
  //   [
  //     { isoDate: "2020-02-02", date: 2, outOfMonth: false, outOfRange: true },
  //     { isoDate: "2020-02-03", date: 3, outOfMonth: false, outOfRange: true },
  //     { isoDate: "2020-02-04", date: 4, outOfMonth: false, outOfRange: true },
  //     { isoDate: "2020-02-05", date: 5, outOfMonth: false, outOfRange: true },
  //     { isoDate: "2020-02-06", date: 6, outOfMonth: false, outOfRange: true },
  //     { isoDate: "2020-02-07", date: 7, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-08", date: 8, outOfMonth: false, outOfRange: false },
  //   ],
  //   [
  //     { isoDate: "2020-02-09", date: 9, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-10", date: 10, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-11", date: 11, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-12", date: 12, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-13", date: 13, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-14", date: 14, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-15", date: 15, outOfMonth: false, outOfRange: false },
  //   ],
  //   [
  //     { isoDate: "2020-02-16", date: 16, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-17", date: 17, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-18", date: 18, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-19", date: 19, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-20", date: 20, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-21", date: 21, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-22", date: 22, outOfMonth: false, outOfRange: false },
  //   ],
  //   [
  //     { isoDate: "2020-02-23", date: 23, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-24", date: 24, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-25", date: 25, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-26", date: 26, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-27", date: 27, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-28", date: 28, outOfMonth: false, outOfRange: false },
  //     { isoDate: "2020-02-29", date: 29, outOfMonth: false, outOfRange: true },
  //   ],
  //   [
  //     { isoDate: "2020-03-01", date: 1, outOfMonth: true, outOfRange: true },
  //     { isoDate: "2020-03-02", date: 2, outOfMonth: true, outOfRange: true },
  //     { isoDate: "2020-03-03", date: 3, outOfMonth: true, outOfRange: true },
  //     { isoDate: "2020-03-04", date: 4, outOfMonth: true, outOfRange: true },
  //     { isoDate: "2020-03-05", date: 5, outOfMonth: true, outOfRange: true },
  //     { isoDate: "2020-03-06", date: 6, outOfMonth: true, outOfRange: true },
  //     { isoDate: "2020-03-07", date: 7, outOfMonth: true, outOfRange: true },
  //   ],
  // ];

  onMount(async () => {
    calculateDialogWidth();
    updateCalendar();
    // await tick();
    // If part of the calendar is hidden when it appears in the UI, the screen will scroll up to show the entire calendar. Setting the focus on the `activeCalendar` is what makes that possible.
    activeCalendar.focus();
    setFocusDay();
  });

  function calculateDialogWidth() {
    // Get window width: https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    // For screens that are wider than 400, set the dialogWidth to be 350. For screens that are narrower than 400, set the width of the dialog to the window width - 30 so there is 15px of padding between the sides of the screen and the sides of the dialog.
    // This calculation might seem strange (and I might change it later), but for desktop screens, users don't need larger buttons because they are probably using a mouse. Calendars that are at least 350px wide should be wide enough for most users, even on touch screens.
    dialogWidth = windowWidth > 400 ? 350 : windowWidth - 30;
  }

  // This function is used to update the dates, the selected date (i.e. the `value`), and the focused date in the calendar.
  function updateCalendar() {
    const fd = getDateObjFromISODate(focusDay);

    monthYearHeading = `${monthLabels[fd.getMonth()]} ${fd.getFullYear()}`;

    // Create a Date object with the first day of the current month.
    let firstDayOfMonth = new Date(fd.getFullYear(), fd.getMonth(), 1);
    // Get the day of the week as a number. 0 represents Sunday.
    let dayOfWeek = firstDayOfMonth.getDay();
    // Get the date of the first Sunday that appears on the calendar (i.e. the Sunday that is before the first day of the month): Get the first day of the month as a number, then subtract the day of the week (which is a number) from the first day of the month.
    const dateOfFirstSundayOnCalendar = firstDayOfMonth.getDate() - dayOfWeek;
    // Create a timestamp for the first Sunday that appears on the calendar: Take the `firstDayOfMonth` object and set its date to the date of the previous Sunday.
    // `setDate()` is the opposite of the `getDate()` - it will set, or change, the date of the Date object it is referencing. If the date that is being set is before or after the month in the Date object, then the month in the Date object will also be changed.
    const timestampOfFirstSundayOnCalendar = firstDayOfMonth.setDate(dateOfFirstSundayOnCalendar);    

    // Create a new Date object that represents the first Sunday that appears on the calendar (i.e. the Sunday that is before the first day of the month).
    const d = new Date(timestampOfFirstSundayOnCalendar);

    // Clear the `dates` array.
    dates.length = 0;

    // This for loop will populate the `dates` array with up to 6 nested arrays (representing the weeks of the month) and each nested array will have 7 calendar date objects (representing the days of the week). 
    // NOTE: If there are no dates in the 6th week of the month, then there will only be 5 nested week arrays.
    for (let i = 0; i < 6; i++) {
      dates.push([]);
      for (let j = 0; j < 7; j++) {
        // If this is the 6th week of the month and the first day of this 6th week is in the following month, then remove the last nested array, which was just inserted and is empty, and break out of the loop so no other dates will be populated.
        if (i === 5 && j === 0 && d.getMonth() !== fd.getMonth()) {
          dates.pop();
          break;
        }
        // Else, push the calendar date objects to the nested week array.
        else {
          dates[i].push({
            isoDate: getISODateFromDateObj(d),
            date: d.getDate(),
            // If the date is not in the current month, then set `outOfMonth` to true.
            outOfMonth: d.getMonth() !== fd.getMonth(),
            // If the date timestamp is before the dateRangeStart date or after the dateRangeEnd date, then set `outOfRange` to true.
            outOfRange: isDateOutOfRange(getISODateFromDateObj(d), validDateRange),
          });
          // Update the date to be next day so the entire calendar of dates will be populated.
          d.setDate(d.getDate() + 1);
        }
      }
    }

    // The `dates` array will have 5 or 6 nested arrays, where each nested array represents one week.
    if (dates.length === 5) {
      dialogHeight = 24.25;
    }
    else {
      dialogHeight = 26.75;
    }
  }

  async function setFocusDay() {
    await tick();
    const newFocusDay = document.querySelector('td[tabindex="0"]');
    newFocusDay?.focus();
  }

  function handleDayClick(day) {
    setDate(day.isoDate);
    hideCalendar();
  }

  async function handleDayKeyDown(event, day, weekIndex, dayIndex) {
    let preventDefaultEvents = false;
    let shouldSetFocusDay = true;

    switch (event.key) {
      case "Esc":
      case "Escape":
        hideCalendar();
        break;

      case " ":
        focusDay = day.isoDate;
        preventDefaultEvents = true;
        break;

      case "Enter":
        setDate(day.isoDate);
        hideCalendar();
        preventDefaultEvents = true;
        break;

      case "Tab":
        cancelBtn.focus();
        if (event.shiftKey) {
          nextYearBtn.focus();
        }
        dialogMessage = "";
        preventDefaultEvents = true;
        shouldSetFocusDay = false;
        break;

      case "Right":
      case "ArrowRight":
        moveFocusToNextDay(day, weekIndex, dayIndex);
        preventDefaultEvents = true;
        break;

      case "Left":
      case "ArrowLeft":
        moveFocusToPreviousDay(day, weekIndex, dayIndex);
        preventDefaultEvents = true;
        break;

      case "Down":
      case "ArrowDown":
        moveFocusToNextWeek(day, weekIndex, dayIndex);
        preventDefaultEvents = true;
        break;

      case "Up":
      case "ArrowUp":
        moveFocusToPreviousWeek(day, weekIndex, dayIndex);
        preventDefaultEvents = true;
        break;

      case "Home":
        moveFocusToFirstDayOfWeek(weekIndex);
        preventDefaultEvents = true;
        break;

      case "End":
        moveFocusToLastDayOfWeek(weekIndex);
        preventDefaultEvents = true;
        break;

      case "PageUp":
        if (event.shiftKey) {
          moveToPreviousYear(day.isoDate);
        } 
        else {
          moveToPreviousMonth(day.isoDate);
        }
        preventDefaultEvents = true;
        break;

      case "PageDown":
        if (event.shiftKey) {
          moveToNextYear(day.isoDate);
        }
        else {
          moveToNextMonth(day.isoDate);
        }
        preventDefaultEvents = true;
        break;
    }

    // Put the focus on the newly selected date.
    if (shouldSetFocusDay) {
      setFocusDay();
    }

    if (preventDefaultEvents) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  async function moveFocusToNextDay(day, weekIndex, dayIndex) {    
    // If the weekIndex is the last row in the calendar and the next day is the first day of the next month (i.e. the focused day is the last day of the month, but the next day on the calendar is disabled because it is the first day of the next month), then set the `focusDay` to be the first day of the next month and update the calendar to the next month.
    if (weekIndex === dates.length - 1 && dates[weekIndex][dayIndex + 1]?.outOfMonth) {
      focusDay = dates[weekIndex][dayIndex + 1].isoDate;
      updateCalendar();
    }
    // If the weekIndex is the last row in the calendar and the dayIndex is the last day in the week (i.e. the focused day is the last day of the month and it is also the last day on the last row and last column in the calendar), then set the `focusDay` to be the first day of the next month and update the calendar to the next month.
    else if (weekIndex === dates.length - 1 && dayIndex === 6) {
      const d = getDateObjFromISODate(day.isoDate);
      // Update the date to be the first day of the next month.
      d.setDate(d.getDate() + 1);
      focusDay = getISODateFromDateObj(d);
      updateCalendar();
    }
    // If the dayIndex is the last day in the week, then add 1 to the weekIndex and set the dayIndex to 0.
    else if (dayIndex === 6) {
      focusDay = dates[weekIndex + 1][0].isoDate;
    }
    // Else set the `focusDay` to the next date.
    else {
      focusDay = dates[weekIndex][dayIndex + 1].isoDate;
    }
  }

  function moveFocusToPreviousDay(day, weekIndex, dayIndex) {
    // If the weekIndex is the first row in the calendar and the previous day is the last day of the previous month (i.e. the focused day is the first day of the month, but the previous day on the calendar is disabled because it is the last day of the previous month), then set the `focusDay` to be the last day of the previous month and update the calendar to the previous month.
    if (weekIndex === 0 && dates[weekIndex][dayIndex - 1]?.outOfMonth) {
      focusDay = dates[weekIndex][dayIndex - 1].isoDate;
      updateCalendar();
    }
    // If the weekIndex is the first row in the calendar and the dayIndex is the first day in the week (i.e. the focused day is the first day of the month and it is also the first day on the first row and first column in the calendar), then set the `focusDay` to be the last day of the previous month and update the calendar to the previous month.
    else if (weekIndex === 0 && dayIndex === 0) {
      const d = getDateObjFromISODate(day.isoDate);
      // Update the date to be the last day of the previous month.
      d.setDate(d.getDate() - 1);
      focusDay = getISODateFromDateObj(d);
      updateCalendar();
    }
    // If the dayIndex is the first day in the week, then subtract 1 from the weekIndex and set the dayIndex to 6.
    else if (dayIndex === 0) {
      focusDay = dates[weekIndex - 1][6].isoDate;
    }
    // Else set the `focusDay` to the previous date.
    else {
      focusDay = dates[weekIndex][dayIndex - 1].isoDate;
    }
  }

  function moveFocusToFirstDayOfWeek(weekIndex) {
    focusDay = dates[weekIndex][0].isoDate;
  }

  function moveFocusToLastDayOfWeek(weekIndex) {
    focusDay = dates[weekIndex][6].isoDate;
  }

  function moveFocusToNextWeek(day, weekIndex, dayIndex) {
    // If the day that will be highlighted in the next week is disabled because it is in the next month but the date is not displayed in the calendar (i.e. the weekIndex is the second to last nested array in the `dates` array), then set the `focusDay` to be the focused day of the next month and update the calendar to the next month.
    if (weekIndex === dates.length - 2 && dates[weekIndex + 1][dayIndex]?.outOfMonth) {
      focusDay = dates[weekIndex + 1][dayIndex].isoDate;
      updateCalendar();
    }
    // If the day that will be highlighted is one week in the future and does not appear in the calendar (i.e. the focused day's weekIndex is the last row in the calendar), then add 7 days to the date object, set the `focusDay` to be the updated date that is one week in the future, and update the calendar to the next month.
    else if (weekIndex === dates.length - 1) {
      const d = getDateObjFromISODate(day.isoDate);
      // Update the date to be the first day of the next month.
      d.setDate(d.getDate() + 7);
      focusDay = getISODateFromDateObj(d);
      updateCalendar();
    }
    // Else set the `focusDay` to the next week's date.
    else {
      focusDay = dates[weekIndex + 1][dayIndex].isoDate;
    }
  }

  function moveFocusToPreviousWeek(day, weekIndex, dayIndex) {
    // If the day that will be highlighted in the previous week is disabled because it is in the previous month but it is displaying in the calendar (i.e. the weekIndex is the second nested array in the `dates` array), then set the `focusDay` to be the focused day of the previous month and update the calendar to the previous month.
    if (weekIndex === 1 && dates[weekIndex - 1][dayIndex]?.outOfMonth) {
      focusDay = dates[weekIndex - 1][dayIndex].isoDate;
      updateCalendar();
    }
    // If the day that will be highlighted is one week in the past and does not appear in the calendar (i.e. the focused day's weekIndex is the first row in the calendar), then subtract 7 days from the date object, set the `focusDay` to be the updated date that is one week in the past, and update the calendar to the previous month.
    else if (weekIndex === 0) {
      const d = getDateObjFromISODate(day.isoDate);
      // Update the date to be the first day of the next month.
      d.setDate(d.getDate() - 7);
      focusDay = getISODateFromDateObj(d);
      updateCalendar();
    }
    // Else set the `focusDay` to the next week's date.
    else {
      focusDay = dates[weekIndex - 1][dayIndex].isoDate;
    }
  }

  function moveToPreviousMonth(date: string) {
    // Create a new Date object from the ISO date string.
    const d = getDateObjFromISODate(date);
    // Update the date to the previous month.
    focusDay = getISODateFromDateObj(new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()));
    updateCalendar();
  }

  function moveToNextMonth(date: string) {
    // Create a new Date object from the ISO date string.
    const d = getDateObjFromISODate(date);
    // Update the date to the next month.
    focusDay = getISODateFromDateObj(new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()));
    updateCalendar();
  }

  function moveToPreviousYear(date: string) {
    // Create a new Date object from the ISO date string.
    const d = getDateObjFromISODate(date);
    // Update the date to the previous year.
    focusDay = getISODateFromDateObj(new Date(d.getFullYear() - 1, d.getMonth(), d.getDate()));
    updateCalendar();
  }

  function moveToNextYear(date: string) {
    // Create a new Date object from the ISO date string.
    const d = getDateObjFromISODate(date);
    // Update the date to the next year.
    focusDay = getISODateFromDateObj(new Date(d.getFullYear() + 1, d.getMonth(), d.getDate()));
    updateCalendar();
  }
</script>

<div
  id="calendar-dialog"
  class="calendar-datepicker"
  style={`width: ${dialogWidth}px; height: ${dialogHeight}rem;`}
  role="dialog" 
  aria-modal="true" 
  aria-label="Choose Date"
  tabindex="-1" 
  bind:this={activeCalendar}
>
  <div class="header">
    <button 
      type="button" 
      class="prev-year" 
      aria-label="previous year"
      onclick={() => moveToPreviousYear(focusDay)}
      onkeydown={(event) => {
        if (event.key === "Esc" || event.key === "Escape") {
          hideCalendar();
        }
      }}
    >
      <Icon icon="vaadin:angle-double-left" width="24" />
    </button>

    <button
      type="button" 
      class="prev-month" 
      aria-label="previous month"
      onclick={() => moveToPreviousMonth(focusDay)}
      onkeydown={(event) => {
        if (event.key === "Esc" || event.key === "Escape") {
          hideCalendar();
        }
      }}
    >
      <Icon icon="vaadin:angle-left" width="24" />
    </button>

    <span id="id-grid-label" class="month-year-heading" aria-live="polite">{ monthYearHeading }</span>

    <button
      type="button" 
      class="next-month" 
      aria-label="next month"
      onclick={() => moveToNextMonth(focusDay)}
      onkeydown={(event) => {
        if (event.key === "Esc" || event.key === "Escape") {
          hideCalendar();
        }
      }}
    >
      <Icon icon="vaadin:angle-right" width="24" />
    </button>

    <button
      type="button" 
      class="next-year" 
      aria-label="next year" 
      bind:this={nextYearBtn}
      onclick={() => moveToNextYear(focusDay)}
      onkeydown={(event) => {
        if (event.key === "Esc" || event.key === "Escape") {
          hideCalendar();
        }
      }}
    >
      <Icon icon="vaadin:angle-double-right" width="24" />
    </button>
  </div>

  <div class="table-wrapper">
    <table class="calendar" role="grid" aria-labelledby="id-grid-label">
      <thead>
        <tr>
          <th scope="col" abbr="Sunday">Su</th>
          <th scope="col" abbr="Monday">Mo</th>
          <th scope="col" abbr="Tuesday">Tu</th>
          <th scope="col" abbr="Wednesday">We</th>
          <th scope="col" abbr="Thursday">Th</th>
          <th scope="col" abbr="Friday">Fr</th>
          <th scope="col" abbr="Saturday">Sa</th>
        </tr>
      </thead>

      <tbody>
        {#each dates as week, weekIndex}
          <tr>
            {#each week as day, dayIndex}
              <td
                tabindex={focusDay === day.isoDate ? 0 : -1}
                aria-selected={value === day.isoDate ? true : null}
                data-date={day.isoDate}
                class:out-of-month={day.outOfMonth}
                class:out-of-range={day.outOfRange}
                onclick={() => handleDayClick(day)}
                onkeydown={(event) => handleDayKeyDown(event, day, weekIndex, dayIndex)}
                onfocus={() => dialogMessage = "Cursor keys can navigate dates"}
              >
                {#if !day.outOfMonth}
                  {day.date}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="dialog-cancel-ok-group">
    <button
      class="dialog-button" 
      value="cancel" 
      bind:this={cancelBtn}
      onclick={(event) => {
        event.preventDefault();
        hideCalendar();
      }}
      onkeydown={(event) => {
        if (event.key === "Shift") {
          event.preventDefault();
        }
        else if (event.key === "Tab")   {
          okBtn.focus();
          event.preventDefault();
          if (event.shiftKey) {
            setFocusDay();
          }
        }
        else {
          hideCalendar();
        }
      }}
    >
      Cancel
    </button>
    <button 
      class="dialog-button" 
      value="ok"
      bind:this={okBtn}
      onclick={(event) => {
        event.preventDefault();
        setDate(focusDay);
        hideCalendar();
      }}
      onkeydown={(event) => {
        if (event.key === "Shift") {
          event.preventDefault();
        }
        else if (event.key === "Tab") {
          if (event.shiftKey) {
            cancelBtn.focus();
            event.preventDefault();
          }
        }
        else {
          setDate(focusDay);
          hideCalendar();
        }
      }}
    >
      OK
    </button>
  </div>
  <div class="dialog-message" aria-live="polite">{ dialogMessage }</div>
</div>

<style>
  @media (--xs-up) {
    .calendar-datepicker {
      border: 3px solid var(--neutral-11);
      outline-width: var(--outline-hidden);
      outline-style: var(--outline-style);
      border-radius: var(--radius);
      cursor: pointer;
      user-select: none;
      background-color: var(--white);
      z-index: 100;

      &:hover, &:focus-within {
        outline-width: var(--outline-width);
        outline-offset: var(--outline-offset);
      }

      & .header {
        cursor: default;
        background-color: var(--neutral-11);
        padding: 7px;
        font-weight: bold;
        text-transform: uppercase;
        color: var(--white);
        display: flex;
        align-items: center;
        justify-content: space-around;

        & .month-year-heading {
          margin: 0;
          padding: 0;
          display: inline-block;
          font-size: 1rem;
          color: var(--white);
          text-transform: none;
          font-weight: bold;
          border: none;

          display: inline-block;
          width: 12rem;
          text-align: center;
        }

        & .prev-year, & .prev-month, & .next-month, & .next-year {

          &:hover {
            outline: 1px solid var(--white);
            border-radius: var(--radius);
          }
        }
      }

      & table.calendar {
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        border: none;
        border-collapse: separate;

        & th, & td {
          padding: 0;
          text-align: center;
          background: var(--white);
          color: var(--text-color);
          border: none;
        }

        & td {
          background-color: var(--element-bg);
          padding: 3px;
          border: var(--border);
          margin: 0;
          line-height: inherit;
          height: 40px;
          width: 40px;
          border-radius: var(--radius);
          font-size: 15px;
          cursor: pointer;

          &:hover {
            border-color: var(--neutral-11);
            box-shadow: 0 0 0 1px var(--neutral-11);
          }

          &.out-of-month, &.out-of-range {
            pointer-events: none;
            border-color: transparent;
          }

          &.out-of-range {
            filter: brightness(90%);
            color: var(--neutral-7);
            font-style: italic;
          }
        }

        /* Selected date styles */
        & td[aria-selected] {
          border: 2px dotted var(--neutral-11);
          padding: 2px;
        }

        /* Focused date styles */
        & td[tabindex="0"] {
          outline: none;
          background-color: var(--neutral-11);
          border-color: var(--neutral-11);
          color: var(--white);
        }
      }

      & .dialog-cancel-ok-group {
        text-align: right;
        margin-top: 1rem;
        margin-bottom: 1rem;
        margin-right: 1rem;

        & .dialog-button {
          padding: 6px;
          margin-left: 1rem;
          width: 5rem;
          background-color: var(--element-bg);
          font-size: 0.85rem;
          color: var(--text-color);
          outline: none;
          border: var(--border);
          border-radius: var(--radius);

          &:focus {
            padding: 5px;
            border: 2px solid var(--neutral-11);
          }

          &:hover {
            border-color: var(--neutral-11);
          }
        }
      }

      & .dialog-message {
        padding-top: 0.25rem;
        padding-left: 1rem;
        height: 1.75rem;
        background: var(--neutral-11);
        color: var(--white);
      }
    }
  }
</style>
