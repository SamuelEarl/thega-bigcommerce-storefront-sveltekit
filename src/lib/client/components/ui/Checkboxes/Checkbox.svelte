<script lang="ts">
  // Importing an external CSS file into the "style" block does not work. When this component gets packaged up and then imported into another app the styles will not be included. So the styles need to be imported into the "script" block.
  import "./checkbox.css";

  interface Props {
    checked: any;
    label: any;
    disabled?: boolean;
    marginBottom?: string;
    // Forward Events:
    onchange?: (event: Event) => void;
    oninput?: (event: Event) => void;
  }

  let {
    checked = $bindable(),
    label,
    disabled = false,
    marginBottom = "var(--size-4)",
    // Forward Events:
    onchange,
    oninput,
    ...restProps
  }: Props = $props();
</script>

<label
  class="fp-checkbox-label-wrapper" 
  class:disabled
  style={`margin-bottom: ${marginBottom};`}
>
  <input
    type="checkbox"
    class="fp-checkbox-input"
    bind:checked
    {disabled}
    {onchange}
    {oninput}
    {...restProps}
  > {label}
  <span class="fp-checkbox-checkmark"></span>
</label>
