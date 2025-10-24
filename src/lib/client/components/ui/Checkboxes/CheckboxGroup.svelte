<script lang="ts">
  import { onMount } from "svelte";
  // Importing an external CSS file into the "style" block does not work. When this component gets packaged up and then imported into another app the styles will not be included. So the styles need to be imported into the "script" block.
  import "./checkbox.css";

  
  interface Props {
    optionsArray: any;
    selectedValues?: any;
    disabled?: boolean;
    marginBottom?: string;
    // Forward Events:
    onchange?: (event: Event) => void;
    oninput?: (event: Event) => void;
  }

  let {
    optionsArray,
    selectedValues = $bindable([]),
    disabled = false,
    marginBottom = "var(--size-4)",
    // Forward Events:
    onchange,
    oninput,
    ...restProps
  }: Props = $props();

  function isOptionPrimitive(option) {
    if (typeof option === "string" || typeof option === "number" || typeof option === "boolean") {
      return true;
    }
    else {
      return false;
    }
  }
</script>

<!--
  IMPORTANT NOTE: 
  `bind:group` does not work with nested components: https://github.com/sveltejs/svelte/issues/2308
  So I have just copied and pasted the code from the Checkbox.svelte component into this component instead of trying to nest a <Checkbox /> component inside this one.
-->
<!--
  In Svelte you would use the `bind:group` property if you want to include all the values from a group of checkboxes into a single array of values that would then get sent to the backend for processing. So if the <Checkbox> component is used as part of a group of checkboxes, then use `bind:group` to bind to the `selectedValues` prop that is passed into this component. Otherwise, if this is a single checkbox (i.e. not part of a group of checkboxes), then do not use the `bind:group` property.
-->

{#each optionsArray as option}
  <label
    class="fp-checkbox-label-wrapper" 
    class:disabled
    style={`margin-bottom: ${marginBottom};`}
  >
    <input
      type="checkbox" 
      class="fp-checkbox-input"
      bind:group={selectedValues} 
      value={isOptionPrimitive(option) ? option : option["value"]}
      {disabled}
      {onchange}
      {oninput}
      {...restProps}
    > {isOptionPrimitive(option) ? option : option["label"]}
    <span class="fp-checkbox-checkmark"></span>
  </label><br>
{/each}
