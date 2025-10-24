<!-- 
  I converted this component to a SvelteKit component:
  https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/

  This content is licensed according to the W3C Software License at
  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
-->

<!-- 
  TODOs:
  * I need to clean up the CSS and make sure that it uses accessible principles. See notes about high contrast styles (which is the last bullet point) on this page: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/#accessibilityfeatures.
      * I need to change the styles for the other components to also use accessible principles.
  * I need to test the accessibility on the input field and the button. The example from the link above focuses on the accessibility of the calendar, but it doesn't talk about the input field or button accessbility. So I need to make sure those have been designed with accessibility in mind too.
-->

<script lang="ts">
  import { getDateObjFromISODate, isDateFormatInvalid, isDateOutOfRange } from "./utils";
  import { getElementColors, getElementSizes } from "../../defaults";
  import type { IColors, ISizes } from "../../defaults";
  
  interface Props {
    value: string;
    /** Checks whether the ISO date string is valid */
    isInvalidFormat?: boolean;
    validDateRange?: string[];
    isOutOfRange?: boolean;
    colors?: IColors | null;
    sizes?: ISizes | null;
    placeholder?: string;
    disabled?: boolean;
  }

  let {
    value = $bindable(),
    isInvalidFormat = $bindable(true),
    validDateRange = [],
    isOutOfRange = $bindable(true),
    colors = null,
    sizes = null,
    placeholder = "YYYY-MM-DD",
    disabled = false,
    ...restProps
  }: Props = $props();

  let dateObjFromVal = $derived(getDateObjFromISODate(value));

  // This will update the `isInvalidFormat` and `isOutOfRange` props when the value changes.
  $effect(() => {
    isInvalidFormat = isDateFormatInvalid(value);
    isOutOfRange = isDateOutOfRange(value, validDateRange);
  });

  const dayLabels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
</script>

<div class="input-container">
  <input
    type="text" 
    bind:value
    style={`${getElementColors(colors).all} ${getElementSizes(sizes).all}`}
    aria-describedby="id-description-1"
    {placeholder}
    {disabled}
    {...restProps}
  >
  <span id="id-description-1" class="desc screen-reader-only">
    {`The date that is currently set is ${dayLabels[dateObjFromVal.getDay()]} ${monthLabels[dateObjFromVal.getMonth()]} ${dateObjFromVal.getDate()}, ${dateObjFromVal.getFullYear()}`}. Set the date in YYYY-MM-DD format.
  </span>
</div>

<style>
  .screen-reader-only {
    position: absolute;
    top: -2000em;
    left: -3000em;
  }

  .input-container {
    width: 100%;

    & input {
      width: 100%;
      border-width: var(--border-width);
      border-style: var(--border-style);
      outline-width: var(--outline-hidden);
      outline-style: var(--outline-style);
      border-radius: var(--radius);

      &::placeholder {
        color: var(--placeholder-text-color);
      }

      &:hover, &:focus {
        outline-width: var(--outline-width);
        outline-offset: var(--outline-offset);
      }

      &:disabled {
        background-color: var(--element-bg-disabled);
        border-color: var(--element-border-color-disabled);
        color: var(--element-text-color-disabled);
        pointer-events: none;
      }
    }
  }
</style>
