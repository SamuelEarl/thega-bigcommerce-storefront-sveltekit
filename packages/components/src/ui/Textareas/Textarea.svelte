<script lang="ts">
  import { getElementColors, getElementSizes } from "../../defaults";
  import type { IColors, ISizes } from "../../defaults";
  
  interface Props {
    value?: string;
    placeholder?: string;
    colors?: IColors | null;
    sizes?: ISizes | null;
    disabled?: boolean;
    // Forward Events:
    onchange?: (event: Event) => void;
    oninput?: (event: Event) => void;
    onkeyup?: (event: Event) => void;
    onblur?: (event: Event) => void;
  }

  let {
    value = $bindable(""),
    placeholder = "",
    colors = null,
    sizes = null,
    disabled = false,
    // Forward Events:
    onchange,
    oninput,
    onkeyup,
    onblur,
    ...restProps
  }: Props = $props();
</script>

<textarea
  bind:value={value}
  style={`${getElementColors(colors).all} ${getElementSizes(sizes).all}`}
  {placeholder}
  {disabled}
  {onchange}
  {oninput}
  {onkeyup}
  {onblur}
  {...restProps}
></textarea>


<style>
  textarea {
    width: 100%;
    border-width: var(--border-width);
    border-style: var(--border-style);
    outline-width: var(--outline-hidden);
    outline-style: var(--outline-style);
    border-radius: var(--radius);

    &:hover, &:focus {
      outline-width: var(--outline-width);
      outline-offset: var(--outline-offset);
    }

    &::placeholder {
      color: var(--placeholder-text-color);
    }

    &:disabled {
      background-color: var(--element-bg-disabled) !important;
      border-color: var(--element-border-color-disabled) !important;
      color: var(--element-text-color-disabled) !important;
      pointer-events: none;
    }
  }
</style>
