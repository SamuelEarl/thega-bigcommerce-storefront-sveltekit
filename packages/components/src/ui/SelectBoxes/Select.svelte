<!-- 
  TODO: Watch this video [What's new in web UI](https://www.youtube.com/watch?v=VTCIStB6y8s) to find out how to style select elements so I can make this component easier to work with.
-->

<!-- `<select>` elements are difficult to style while maintaining accessibility. The easiest (and possibly the best) way to create an accessible `<Select />` component is to use the native `<select>` element and simply style the button part while leaving the dropdown as it is provided natively by the browser. See https://www.filamentgroup.com/lab/select-css.html -->

<script lang="ts">
  import { getElementColors, getElementSizes } from "../../defaults";
  import type { IColors, ISizes } from "../../defaults";

  interface Props {
    options: string[] | number[] | boolean[] | object[];
    optionValue?: string;
    optionLabel?: string;
    optgroup?: string;
    value: string | number | boolean | object;
    colors?: IColors | null;
    sizes?: ISizes | null;
    arrowWidth?: string;
    arrowHeight?: string;
    disabled?: boolean;
    // Forward Events:
    onchange?: (event: Event) => void;
    onfocus?: (event: Event) => void;
    onblur?: (event: Event) => void;
  }

	let {
    options,
    optionValue = "",
    optionLabel = "",
    optgroup = "",
    value = $bindable(),
    colors = null,
    sizes = null,
    arrowWidth = "1rem",
    arrowHeight = "1rem",
    disabled = false,
    // Forward Events:
    onchange,
    onfocus,
    onblur,
    ...restProps
  }: Props = $props();

	const uid = $props.id();
  let optionsDataType = $derived(typeof options[0] === "object" ? "object" : "primitive");
  
	// When the `optgroups` object is created it will look like the following.
	// This will allow this <Select> component to render properly with <optgroup> elements.
	// TODO: I need to make optgroups look like the following because native select elements can only work with primitive data types. They won't work with objects as the selected option. And then I need to test this with the native select element (by tabbing to it in the UI) to see if everything renders properly and the correct options get selected accurately.
	// let optgroups = {
	//   Sauropods: [
	//     { group: "Sauropods", value: "diplodocus", label: "Diplodocus" },
	//     { group: "Sauropods", value: "saltasaurus", label: "Saltasaurus" },
	//     { group: "Sauropods", value: "apatosaurus", label: "Apatosaurus" },
	//   ],
	//   Theropods: [
	//     { group: "Theropods", value: "tyrannosaurus", label: "Tyrannosaurus" },
	//     { group: "Theropods", value: "velociraptor", label: "Velociraptor" },
	//     { group: "Theropods", value: "deinonychus", label: "Deinonychus" },
	//   ],
	// };

  /**
	 * This function will group the `options` by the order of first appearance of the `optgroup` prop.
	 * https://stackoverflow.com/questions/44887733/group-array-items-by-order-of-their-first-appearance
	 *
	 * How does the JavaScript Array.sort() method work?
	 * https://www.javascripttutorial.net/javascript-array-sort/#:~:text=The%20sort()%20method%20allows,first%20and%20largest%20value%20last.
	 */
	// let sortOptionsIntoOptgroups = $derived.by(() => {
  let sortedOptgroups = $derived.by(() => {
		try {
      const optgroups = {};
      // This sort() function will loop through the `options` array that is passed into this component and sort the elements so that the elements with the same `optgroup`s are grouped together.
			const sortedOptions = options.sort(function (a, b) {
				// If `(a[optgroup] !== b[optgroup])`, then sort the two elements so that b (the first element) stays in the lower index position (i.e. b comes first).
				if (a[optgroup] !== b[optgroup]) {
					let indexA = options.findIndex((option) => option[optgroup] === a[optgroup]);
					let indexB = options.findIndex((option) => option[optgroup] === b[optgroup]);
					return indexA - indexB;
				}
				// Otherwise leave them where they are (i.e. do not sort them).
				else {
					return 0;
				}
			});

			let currentOptgroup = "";
			// This for loop will loop through the `sortedOptions` array and create an `optgroups` object. See the `optgroups` object example above this function for details.
			for (let i = 0; i < sortedOptions.length; i++) {
				if (currentOptgroup !== sortedOptions[i][optgroup]) {
					// Update the currentOptgroup value.
					currentOptgroup = sortedOptions[i][optgroup];
					optgroups[currentOptgroup] = [sortedOptions[i]];
				} else {
					optgroups[currentOptgroup].push(sortedOptions[i]);
				}
			}

      return optgroups;
		} catch (err) {
			console.error("sortOptionsIntoOptgroups:", err);
		}
	});
</script>

<div
  class="select-wrapper"
  style={`background-color: ${getElementColors(colors).bg};`}
>
  <select
    class="select-native"
    style={`color: ${getElementColors(colors).fg}; border-color: ${getElementColors(colors).br}; outline-color: ${getElementColors(colors).ol}; ${getElementSizes(sizes).all}`}
    aria-labelledby={uid} 
    bind:value={value}
    {...restProps}
    {disabled}
    {onchange}
    {onfocus}
    {onblur}
  >
    {#if optionsDataType === "primitive"}
      {#each options as option}
        <option value={option}>{option}</option>
      {/each}
    {:else if optionsDataType === "object"}
      {#if optgroup}
        {#each Object.entries(sortedOptgroups) as [key, value]}
          <optgroup label={key}>
            {#each value as option}
              <option value={option[optionValue]}>{option[optionLabel]}</option>
            {/each}
          </optgroup>
        {/each}
      {:else}
        {#each options as option}
          <option value={option[optionValue]}>{option[optionLabel]}</option>
        {/each}
      {/if}
    {/if}
  </select>
  <!-- Arrow icon -->
  <svg
    width={arrowWidth}
    height={arrowHeight}
    fill={`${getElementColors(colors).fg}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="transform: rotate(90deg);" class:disabled>
    <path d="M15.7 11.3l-6-6c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l5.3 5.3-5.3 5.3c-0.4 0.4-0.4 1 0 1.4 0.2 0.2 0.4 0.3 0.7 0.3s0.5-0.1 0.7-0.3l6-6c0.4-0.4 0.4-1 0-1.4z"></path>
  </svg>
</div>

<style>
  /* Support for rtl text, explicit support for Arabic and Hebrew */
  :root:dir(rtl) .select-native,
  :root:lang(ar) .select-native,
  :root:lang(iw) .select-native {
    background-position: left 0.7em top 50%, 0 0;
    padding: 0.6em 0.8em 0.5em 1.4em;
  }

  .select-wrapper {
    border-radius: var(--radius);
    position: relative;
    display: flex;
    align-items: center;

    & .select-native {
      display: block;
      width: 100%;
      max-width: 100%;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-color: transparent;
      border-width: var(--border-width);
      border-style: var(--border-style);
      border-radius: var(--radius);
      outline-width: var(--outline-hidden);
      outline-style: var(--outline-style);
      cursor: pointer;
      /* background-image: url('data:image/svg+xml,<svg width="1.2em" height="1.2em" fill="var(--custom-select-text-color, var(--text-color))" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="transform: rotate(90deg);"><path d="M15.7 11.3l-6-6c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l5.3 5.3-5.3 5.3c-0.4 0.4-0.4 1 0 1.4 0.2 0.2 0.4 0.3 0.7 0.3s0.5-0.1 0.7-0.3l6-6c0.4-0.4 0.4-1 0-1.4z"></path></svg>');
      background-repeat: no-repeat, repeat;
      background-position: right 0.7em top 50%, 0 0;
      background-size: 1em auto, 100%; */

      &:hover, &:focus {
        outline-width: var(--outline-width);
        outline-offset: var(--outline-offset);
      }

      /* Disabled styles */
      &:disabled,
      &[aria-disabled="true"] {
        /* It looks like browsers dim the colors of <select> elements by about 10%, so these styles try to accomodate for that. The `white: 100%` is not a typo. */
        background-color: color-mix(in srgb, black 10%, var(--element-bg-disabled)) !important;
        border-color: color-mix(in srgb, black 10%, var(--element-border-color-disabled)) !important;
        color: color-mix(in srgb, white 100%, var(--element-text-color-disabled)) !important;
        pointer-events: none;
      }

      & option {
        font-weight: normal;
        color: var(--text-color);
      }
    }

    & .select-native::-ms-expand {
      display: none;
    }

    & svg {
      position: absolute;
      right: 0.7em;
      /* For some reason this `pointer-events: none` style actually gives the svg the ability to be clicked. I don't know why that is happening. */
      pointer-events: none;
      
      /* Disabled styles */
      &.disabled {
        fill: color-mix(in srgb, white 100%, var(--element-text-color-disabled));
      }
    }
  }
</style>
