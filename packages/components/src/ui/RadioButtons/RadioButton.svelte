<script lang="ts">
  interface Props {
    group: any;
    value: any;
    label?: any;
    disabled?: boolean;
    marginBottom?: string;
    // Forward Events:
    onchange?: (event: Event) => void;
    oninput?: (event: Event) => void;
  }

  let {
    group = $bindable(),
    value,
    label = value,
    disabled = false,
    marginBottom = "var(--size-4)",
    // Forward Events:
    onchange,
    oninput,
    ...restProps
  }: Props = $props();
</script>


<label
  class="fp-radio-label-wrapper" 
  class:disabled
  style={`margin-bottom: ${marginBottom}`}
>
  <input
    type="radio"
    class="fp-radio-input" 
    bind:group={group} 
    {value} 
    {disabled}
    {onchange}
    {oninput}
    {...restProps}
  > {label}
  <span class="fp-radio-checkmark"></span>
</label>


<style>
  /* Since these styles mimic the <Checkbox /> component style, they are also organized in the same way.  */
  /* Radio Button Styles: https://www.w3schools.com/howto/howto_css_custom_checkbox.asp */

  /* Customize the label (the container). */
  .fp-radio-label-wrapper {
    display: inline-block;
    position: relative;
    padding-top: 1px;
    padding-left: var(--size-9);
    cursor: pointer;
    font-size: var(--size-base);
    /* -webkit-user-select: none; */
    /* -moz-user-select: none; */
    /* -ms-user-select: none; */
    user-select: none;
  }

  /* Hide the browser's default radio button. */
  .fp-radio-input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Set the base outline styles for the radio. */
  .fp-radio-input ~ .fp-radio-checkmark {
    outline-width: var(--outline-hidden);
    outline-style: var(--outline-style);
    outline-offset: var(--outline-offset);
  }

  /* When an unchecked radio button is hovered or receives focus, add an outline to the radio button that is the default outline color. */
  .fp-radio-input:hover ~ .fp-radio-checkmark,
  .fp-radio-input:focus ~ .fp-radio-checkmark {
    outline-width: var(--outline-width);
    outline-color: var(--outline-color);
  }

  /* When a radio button is checked, add a primary background color and change the border color to match the background color. */
  .fp-radio-input:checked ~ .fp-radio-checkmark {
    background-color: var(--primary-bg);
    border-color: var(--primary-bg);
  }

  /* Show the checkmark when checked. */
  .fp-radio-input:checked ~ .fp-radio-checkmark:after {
    display: block;
  }

  /* When a checked radio button is hovered or receives focus, add an outline to the radio button that is the primary color. */
  .fp-radio-input:checked:hover ~ .fp-radio-checkmark,
  .fp-radio-input:checked:focus ~ .fp-radio-checkmark {
    outline-width: var(--outline-width);
    outline-color: var(--primary-bg);
  }

  /* Create a custom radio button. */
  /* The `top` style below will set the radio button higher or lower in relation to the label text. The font family and font size that you set in your app will affect where the radio buttons are aligned in relation to the label text of the radio buttons. */
  .fp-radio-checkmark {
    position: absolute;
    top: -1px;
    left: 0;
    height: var(--size-7);
    width: var(--size-7);
    border: var(--border);
    border-radius: 50%;
    background-color: var(--element-bg);
  }

  /* Create the checkmark/indicator. */
  .fp-radio-checkmark:after {
    /* Hide the checkmark/indicator when not checked. */
    content: "";
    position: absolute;
    display: none;
    /* Style the checkmark/indicator. */
    top: 6px;
    left: 6px;
    width: var(--size-3);
    height: var(--size-3);
    border-radius: 50%;
    background: white;
  }

  /* Disabled radio buttons styles */
  .fp-radio-input:disabled ~ .fp-radio-checkmark {
    background-color: var(--element-bg-disabled);
    color: var(--element-text-color-disabled);
    border-color: var(--element-border-color-disabled);
    pointer-events: none;
  }
  /* When a disabled radio button is hovered, prevent the thicker outline from appearing around the radio button. */
  .fp-radio-input:disabled ~ .fp-radio-checkmark {
    outline-width: var(--outline-hidden);
  }
  /* Set `cursor: default` on the label text of a disabled radio button. */
  .fp-radio-label-wrapper.disabled {
    pointer-events: none;
  }
</style>
