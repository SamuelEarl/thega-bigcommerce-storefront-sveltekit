<!--
  I started with the calculator component from the following codesandbox and 
  then modified it quite a bit to get it to work like a regular calculator:
  * https://codesandbox.io/s/svelte-calculator-9icog
-->

<script lang="ts">
	import { onMount } from "svelte";
	import { evaluate } from "mathjs";
	import { getElementColors } from "../../defaults";
  import type { IColors } from "../../defaults";

	interface Props {
		closeBtn?: boolean;
		insertBtn?: boolean;
		insertBtnText?: string;
		decimalPlaces?: number;
		colors?: IColors | null;
		onSetCalculationResultCallback: (event: CustomEvent) => void;
		onHideCalculatorCallback: (event: CustomEvent) => void;
	}

	let {
		closeBtn = true,
		insertBtn = true,
		insertBtnText = "Insert",
		decimalPlaces = 2,
		colors = { bg: "var(--white)", fg: "var(--text-color)", br: "var(--neutral-11)", ol: "var(--neutral-11)" },
		onSetCalculationResultCallback,
		onHideCalculatorCallback,
	}: Props = $props();

	let activeCalculator = $state();
	let calculationArr: string[] = $state([]);
	// When the `calculationResult` is a number, then the type will also be a number.
	// But when the `calculationResult` is a mathematical symbol or an error, then the type will be a string.
	let calculationResult: number | string = $state(0);
	let disableInsertValueBtn = $state(true);
	let disableEqualBtn = $state(true);
	let highlightCloseBtn = $state(false);
  let dialogMessage = "Number pad can enter calculations";

	let buttons = [
		{ value: "Clear", id: "clear", keyboardInput: "Keyboard Input:\nBackspace or Delete" },
		{ value: "Clear All", id: "clear-all", keyboardInput: "Keyboard Input:\na or A" },
		{ value: "(–)", id: "negative", keyboardInput: "Keyboard Input:\n–" },
		{ value: "(", id: "left-paren", keyboardInput: "" },
		{ value: ")", id: "right-paren", keyboardInput: "" },
		{ value: "÷", id: "divide", keyboardInput: "Keyboard Input:\n/" },
		// This is the multiplication symbol used in the calculator.
		{ value: "×", id: "multiply", keyboardInput: "Keyboard Input:\n*" },
		// This minus symbol is an n-dash, which will throw an error in the `calculateHandler()` function. But the n-dash is converted to a regular minus sign.
		{ value: "–", id: "minus", keyboardInput: "" },
		{ value: "+", id: "add", keyboardInput: "" },
		{ value: "=", id: "equal", keyboardInput: "Keyboard Input:\nEnter or =" },
		{ value: "1", id: "one", keyboardInput: "" },
		{ value: "2", id: "two", keyboardInput: "" },
		{ value: "3", id: "three", keyboardInput: "" },
		{ value: "4", id: "four", keyboardInput: "" },
		{ value: "5", id: "five", keyboardInput: "" },
		{ value: "6", id: "six", keyboardInput: "" },
		{ value: "7", id: "seven", keyboardInput: "" },
		{ value: "8", id: "eight", keyboardInput: "" },
		{ value: "9", id: "nine", keyboardInput: "" },
		{ value: "0", id: "zero", keyboardInput: "" },
		{ value: ".", id: "decimal", keyboardInput: "" },
	];

	// These are all the possible keys that a user could use to enter data through their keyboard.
	let possibleKeys = [
		"Enter",
		"Escape",
		"Backspace",
		"Delete",
		"a",
		"A",
		"(",
		")",
		"/",
		"*",
		"-",
		"+",
		"=",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"0",
		".",
	];

	// NOTE: I do not want to hide the calculator when a user clicks outside of it because users might accidentally click outside of the calculator by accident (especially on mobile devices), which would clear their calculations. I don't want their calculations to get cleared before they are able to insert the total into the input field.
	onMount(() => {
		// When this component mounts, give it focus so the keypress events will work according to how they are configured for the calculator. For example, if the calculator does not receive focus, then the "Enter" key will toggle the calculator open and closed.
		// Also, when the activeCalculator receives focus, if there is not enough space for the calculator, then the focus event will cause the the screen to scroll up to show the entire calculator.
		activeCalculator.focus();
	});

	/**
	 * This function allows users to enter characters into the calculator in the same way they would enter characters into a physical calculator. If there are syntax errors in the expression, then the `calculateHandler()` function will handle that and the user will see a "Syntax Error" message in the calculator display.
	 */
	function btnClickHandler(btnVal: string) {
		// Calculate the total when a user clicks the "=" button.
		if (btnVal === "=") {
			// If there is a least one entry in the calculator, then allow the calculateHandler() function to execute.
			if (calculationArr.length > 0) {
				calculateHandler();
			}
			return;
		}

		// If the user clicks any button other than the "=",
		// then disable the insert value button, which is its default state.
		disableInsertValueBtn = true;

		let lastElementInCalcArr = calculationArr[calculationArr.length - 1];

		if (btnVal === "Clear") {
			// If there are no more elements in calculationArr, then return early.
			if (calculationArr.length === 0) return;

			// Remove the last entry in the calculator.
			// If the last element in the array is multiple characters long, then remove the last character only.
			if (lastElementInCalcArr.length > 1) {
				// Get all the characters in the last element except the last character.
				let lastElementMinusLastCharacter = lastElementInCalcArr.slice(0, -1);
				// Set the last element in the calculationArr to lastElementMinusLastCharacter.
				calculationArr[calculationArr.length - 1] = lastElementMinusLastCharacter;
			}
			// If the last element in the array is only one character long, then remove the last element.
			else {
				calculationArr.pop();
			}

			// If there are no more elements in calculationArr, then reset its value to 0.
			if (calculationArr.length === 0) {
				calculationResult = 0;
				disableEqualBtn = true;
			}
			// Else set calculationResult to the last character within the last element (not the last element) in calculationArr.
			else {
				let lastElement = calculationArr[calculationArr.length - 1];
				// The calculationResult type will be a string in this case.
				calculationResult = lastElement[lastElement.length - 1];
			}

			return;
		}

		if (btnVal === "Clear All") {
			// Clear all the entries in the calculator.
			calculationArr.length = 0;
			calculationResult = 0;
			disableEqualBtn = true;
			return;
		}

		// How to handle "(–)". If the user clicks the "(–)" button, which uses an n-dash symbol, then push a regular minus sign to the `calculationArr` and set the `calculationResult` to "-".
		if (btnVal === "(–)") {
			// Push "-" to `calculationArr`.
			calculationArr.push("-");
			// Set `calculationResult` to "-".
			calculationResult = "-";
			return;
		}

		// Push the `btnVal` to `calculationArr`.
		calculationArr.push(btnVal);
		// Set the `calculationResult` to the last button value that was entered.
		calculationResult = btnVal;
		// Format the `calculationArr` so that it appears as a correctly formatted mathematical expression in the calculator display.
		calculationArr = formatCalculationArr();

		// Check if calculationArr contains any elements.
		// If it does, then enable the equal button.
		// If it does not, then disable the equal button.
		calculationArr.length > 0
			? disableEqualBtn = false
			: disableEqualBtn = true;
	}

	/**
	 * This function handles the click event for the "Insert" button.
	 */
	function insertBtnClickHander() {
		// Call the `onSetCalculationResultCallback()` prop with the `calculationResult` value.
		onSetCalculationResultCallback(calculationResult);
		// Disable the Insert button so the user cannot click it again until they run another calculation.
		disableInsertValueBtn = true;
		// If the `closeBtn` prop is set to true, then highlight the close button so the user will notice it easier.
		highlightCloseBtn = true;
	}

	/**
	 * This function handles keypress events for the calculator.
	 * If the key that is pressed is an allowed key, then it will call the `btnClickHandler()` function with the key value (and when necessary, it will convert the key that was pressed to an equivalent button on the calculator before calling the `btnClickHandler()` function). 
	 * If the key is not allowed, then it will return early.
	 * NOTE: Some allowed key presses also return early to prevent unnecessary calls to the `btnClickHandler()` function.
	 * @param event
	 */
	function keypressHandler(event) {
    // This `<Calculator>` component receives focus when it is mounted. That means that if this `<Calculator>` component is visible in the UI, any keystrokes will be intercepted and handled by the `<Calculator>` until the user removes focus from it by clicking outside of the `<Calculator>` or tabbing to another element. This `if` statement in combination with the `tabindex` attributes in this component allow the user to tab away from the `<Calculator>` component when it is visible in the UI.
    if (event.key === "Tab") return;

		// Prevent keys like the spacebar from doing strange things in the browser.
		// For example, when a user presses the spacebar it causes the browser to scroll down as if
		// the user pressed the "Page Down" key.
		event.preventDefault();

		let key = event.key;
		// If the user presses a key that is not in the `possibleKeys` array, then return.
		if (!possibleKeys.includes(key)) return;

		// How to handle the `Enter` key.
		if (key === "Enter") {
			// If both the `disableEqualBtn` and `disableInsertValueBtn` flags are set to true, then return early so the user cannot press the `Enter` key to run a calculation or insert a value into an input field.
			if (disableEqualBtn && disableInsertValueBtn) {
				return;
			}
			// If the "Insert" button is disabled, then convert an initial `Enter` key press to an `=` button click.
			// An initial `Enter` key press acts like the `=` button in the calculator: It will calculate the entries in the calculator and it will enable the Insert button, if the Insert button is present in the calculator.
			if (disableInsertValueBtn) {
				key = "=";
			}
			// If the "Insert" button is enabled, then treat a second `Enter` key press as an "Insert" button click.
			// If the Insert button is present in the calculator and it is enabled: If the user presses the `Enter` key again while the Insert button is enabled, then it will be the same as the user clicking the Insert button in the calculator.
			else {
				insertBtnClickHander();
				// Return early so the `btnClickHandler()` function does not get called with the `Enter` key unnecessarily.
				return;
			}
		}
		// If the user presses the `Escape` key, then call the `onHideCalculatorCallback()` prop and return early.
		if (key === "Escape") {
			onHideCalculatorCallback();
			return;
		}
		// Convert the `Backspace` and `Delete` key presses to a "Clear" button click.
		if (key === "Backspace" || key === "Delete") {
			key = "Clear";
		}
		// Convert the `a` or `A` key presses to a "Clear All" button click.
		if (key === "a" || key === "A") {
			key = "Clear All";
		}
		// Convert the "/" key press to a "÷" button click.
		if (key === "/") {
			key = "÷";
		}
		// Convert the "*" key press to a "×" button click.
		if (key === "*") {
			key = "×"; // This is the multiplication symbol used in the calculator.
		}

		btnClickHandler(key);
	}

	/**
	 * This function will run the calculation that is contained in the `calculationArr` array.
	 */
	function calculateHandler() {
		try {
			// Disable the "=" button so the user doesn't think they can (or have to) click it multiple times in a row.
			disableEqualBtn = true;
			// Create a copy of the `calculationArr` and convert any necessary symbols to their JavaScript mathematical equivalents.
			let calcArr = [...calculationArr];
			for (let i = 0; i < calculationArr.length; i++) {
				// Convert the divide, multiply, and subtract icons to their JavaScript mathematical symbols.
				if (calcArr[i] === "÷") {
					calcArr[i] = "/";
				}
				if (calcArr[i] === "×") {
					calcArr[i] = "*";
				}
				// Convert the n-dash to a regular minus sign.
				if (calcArr[i] === "–") {
					calcArr[i] = "-";
				}
			}
			// The result of running the calculation with the `evaluate()` function is set to 2 decimal places with
			// `toFixed(2)` to prevent precision loss (see https://javascript.info/number#imprecise-calculations).
			// `toFixed()` returns a string, so that string is then converted to a number type using the unary plus.
			// If the result remained a string, then it would cause an error in the parent transaction's amount field
			// (that field would be $0.00) because numbers cannot be added to strings and return an accurate result.
			calculationResult = +evaluate(calcArr.join("")).toFixed(decimalPlaces);
			// After the user clicks the "=" sign and the calculation is run, the "Insert" button will be enabled so the user can insert the result into an input field. Hopefully this provides a better user experience.
			disableInsertValueBtn = false;
		} 
    catch (err) {
			console.error("calculateHandler:", err);
			calculationResult = "Syntax Error";
			// If there is an error, then disable the Insert button.
			disableInsertValueBtn = true;
		}
	}

	/**
	 * This function formats the `calculationArr` so that it appears as a 
	 * correctly formatted mathematical expression in the calculator display.
	 */
	function formatCalculationArr() {
		let formattedArray = [];
		// Loop over each element in the `calculationArr`.
		for (let i = 0; i < calculationArr.length; i++) {
			// There is no need to format the first character, so push it into the calculationArr as is.
			if (i === 0) {
				formattedArray.push(calculationArr[i]);
			} else {
				// If the previous element and the current element are both numbers, then combine them into one number in the same element.
				if (!isNaN(calculationArr[i - 1]) && !isNaN(calculationArr[i])) {
					// Create a new number that combines the previous number with the current number.
					let newNumber = formattedArray[formattedArray.length - 1] + calculationArr[i];
					// Replace the previous number with the new number.
					formattedArray[formattedArray.length - 1] = newNumber;
				}
				// If the current element is "." and the previous element is a number, then combine them.
				else if (calculationArr[i] === "." && !isNaN(calculationArr[i - 1])) {
					// Create a new number that combines the previous number with a decimal.
					let numWithDecimal = formattedArray[formattedArray.length - 1] + ".";
					// Replace the previous number with the new number.
					formattedArray[formattedArray.length - 1] = numWithDecimal;
				}
				// If the current element is a number and the previous element ends with a ".", then combine them.
				else if (!isNaN(calculationArr[i]) && calculationArr[i - 1].endsWith(".")) {
					// Create a new number that combines the previous number, which ends with a decimal point, with the current number.
					let decimalNumber = formattedArray[formattedArray.length - 1] + calculationArr[i];
					// Replace the previous number with the new number.
					formattedArray[formattedArray.length - 1] = decimalNumber;
				}
				// Else, push the element to the `calculationArr` without formatting it.
				else {
					formattedArray.push(calculationArr[i]);
				}
			}
		}
		return formattedArray;
	}
</script>

<!-- 
  This component is throwing the following A11y warnings:
  * A11y: Non-interactive element cannot have nonnegative tabIndex value.
  * A11y: Non-interactive element <div> should not be assigned mouse or keyboard event listeners.

  I am including a11y ignore comments for the following reasons:
  * The <div> element has a `tabindex="0"` attribute so keyboard users can tab to the calculator component. 
  * The <div> element has a `keydown` listener so keyboard users key presses will handled appropriately.
-->
<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
<div
  class="calculator"
	style={`${getElementColors(colors).all}`}
  role="dialog"
  aria-modal="true" 
  aria-label="Calculator"
  tabindex="0"
  bind:this={activeCalculator} 
  onkeydown={keypressHandler}
>
  <div class="display">
    <div class="top-container">
      <div class="top">{calculationArr.join(" ")}</div>
    </div>
    <div class="bottom-container">
      <div class="bottom">{calculationResult}</div>
    </div>
  </div>
  <div class="calculation-btns-container">
    {#each buttons as button}
      <button
        id={button.id}
				class:highlight-btn={button.id === "equal"}
        aria-label={button.id}
        tabindex="-1"
        onclick={(event) => {
					event.preventDefault();
					btnClickHandler(button.value);
				}}
        title={button.keyboardInput}
				disabled={button.id === "equal" && disableEqualBtn}
      >
        {button.value}
      </button>
    {/each}
  </div>
  {#if closeBtn || insertBtn}
    <div class="close-insert-group">
      {#if closeBtn}
        <button
          id="close"
					class:highlight-close-btn={highlightCloseBtn}
					ontransitionend={() => {
						// Remove the `highlight-close-btn` class when the CSS transition ends.
            highlightCloseBtn = false;
          }}
          value="close"
          tabindex="-1"
          onclick={onHideCalculatorCallback}
        >
          Close
        </button>
      {/if}
      {#if insertBtn}
        <button
          id="insert"
					class="highlight-btn"
          aria-label={insertBtnText}
          tabindex="-1"
          disabled={disableInsertValueBtn}
          onclick={() => insertBtnClickHander()}
          title={`Keyboard Input:\nEnter (when button is enabled)`}
        >
          {insertBtnText}
        </button>
      {/if}
    </div>
  {/if}
  <div class="dialog-message" aria-live="polite">
    { dialogMessage }
  </div>
</div>


<style>
  .calculator {
    width: 275px;
		border-width: 3px;
    border-style: var(--border-style);
    outline-width: var(--outline-hidden);
    outline-style: var(--outline-style);
    border-radius: var(--radius);
    user-select: none;

    &:hover, &:focus {
      outline-width: var(--outline-width);
      outline-offset: var(--outline-offset);
    }

    & .display {
      height: 65px;
      padding: 0 5px;
      margin: 7px;
      border: var(--border);
      border-radius: var(--radius);
      background-color: var(--neutral-2);
      cursor: initial;

			/* Display containers */
      & > div {
        text-align: right;
        box-sizing: border-box;
        height: 50%;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        text-align: right;
        overflow: hidden;
        white-space: nowrap;
      }

			/* Top display */
      & .top {
        float: right;
        font-size: 0.9em;
        line-height: 200%;
      }

			/* Bottom display */
      & .bottom-container {
        padding-top: 5px;

        & .bottom {
          font-size: 1.2em;
          line-height: 100%;
        }
      }
    }

		/* Calculator buttons */
    & button {
      padding: 4px;
      outline: none;
      border: var(--border);
      border-radius: var(--radius);
      background-color: var(--neutral-2);
      font-weight: 700;
      font-size: 1em;
      cursor: pointer;

			&.highlight-btn {
				border-color: var(--neutral-11);
				background-color: var(--neutral-11);
				color: var(--white);

				&:disabled {
					border-color: var(--element-border-color-disabled);
				}
			}

			&.highlight-close-btn {
				border-color: var(--neutral-11);
				background-color: var(--neutral-11);
				color: var(--white);
				transition: transform .3s;
				transform: scale(1.1);
			}

      &:disabled {
        background-color: var(--element-bg-disabled);
				border-color: var(--element-border-color-disabled);
        color: var(--element-text-color-disabled);
        cursor: default;
				pointer-events: none !important;
      }
    }

    & .calculation-btns-container {
      display: grid;
      grid-template-columns: 24% 24% 24% 24%;
      grid-gap: 3px;
      margin: 7px;

      & #clear {
        grid-row: 1 / 2;
        grid-column: 1 / 3;
        margin-bottom: 5px;
      }
      & #clear-all {
        grid-row: 1 / 2;
        grid-column: 3 / 5;
        margin-bottom: 5px;
      }

      & #negative {
        grid-row: 2 / 3;
        grid-column: 1 / 2;
      }
      & #left-paren {
        grid-row: 2 / 3;
        grid-column: 2 / 3;
      }
      & #right-paren {
        grid-row: 2 / 3;
        grid-column: 3 / 4;
      }
      & #divide {
        grid-row: 2 / 3;
        grid-column: 4 / 5;
      }

      & #seven {
        grid-row: 3 / 4;
        grid-column: 1 / 2;
      }
      & #eight {
        grid-row: 3 / 4;
        grid-column: 2 / 3;
      }
      & #nine {
        grid-row: 3 / 4;
        grid-column: 3 / 4;
      }
      & #multiply {
        grid-row: 3 / 4;
        grid-column: 4 / 5;
      }

      & #four {
        grid-row: 4 / 5;
        grid-column: 1 / 2;
      }
      & #five {
        grid-row: 4 / 5;
        grid-column: 2 / 3;
      }
      & #six {
        grid-row: 4 / 5;
        grid-column: 3 / 4;
      }
      & #minus {
        grid-row: 4 / 5;
        grid-column: 4 / 5;
      }

      & #one {
        grid-row: 5 / 6;
        grid-column: 1 / 2;
      }
      & #two {
        grid-row: 5 / 6;
        grid-column: 2 / 3;
      }
      & #three {
        grid-row: 5 / 6;
        grid-column: 3 / 4;
      }
      & #add {
        grid-row: 5 / 6;
        grid-column: 4 / 5;
      }

      & #zero {
        grid-row: 6 / 7;
        grid-column: 1 / 3;
        margin-bottom: 1px;
      }
      & #decimal {
        grid-row: 6 / 7;
        grid-column: 3 / 4;
        margin-bottom: 1px;
      }
      & #equal {
        grid-row: 6 / 7;
        grid-column: 4 / 5;
        margin-bottom: 1px;
      }
    }

    & .close-insert-group {
      display: flex;
      gap: 3px;
      margin: 7px;

      & button {
        flex: 1;
      }
    }

    & .dialog-message {
      padding: 5px 7px 3px 7px;
      margin-top: 8px;
      background-color: var(--neutral-11);
      color: var(--white);
    }
  }
</style>
