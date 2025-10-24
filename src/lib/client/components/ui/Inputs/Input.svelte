<script lang="ts">
  import { getElementColors, getElementSizes } from "../../defaults";
  import type { IColors, ISizes } from "../../defaults";

  interface Props {
    id?: string;
    type?: string;
    value?: string | number;
    list?: string;
    colors?: IColors | null;
    sizes?: ISizes | null;
    min?: string;
    max?: string;
    step?: string;
    placeholder?: string;
    disabled?: boolean;
    // Forward Events:
    onchange?: (event: Event) => void;
    oninput?: (event: Event) => void;
    onkeyup?: (event: Event) => void;
    onblur?: (event: Event) => void;
  }

  let {
    id = "",
    type = "text",
    value = $bindable(),
    list = "",
    colors = null,
    sizes = null,
    min = "",
    max = "",
    step = "",
    placeholder = "",
    disabled = false,
    // Forward Events:
    onchange,
    oninput,
    onkeyup,
    onblur,
    ...restProps
  }: Props = $props();

  const uid = $props.id();
</script>


<!-- 
  NOTE: If I try to set the `type` attribute to a dynamic prop, then I get this error:
  "type" attribute cannot be dynamic if input uses two-way binding
  So I have to repeat a lot of code for each input type.
-->
{#if type === "text"}
  <input
    id={id ? id : uid}
    type="text"
    bind:value={value}
    {list}
    class="fp-input"
    style={`${getElementColors(colors).all} ${getElementSizes(sizes).all}`}
    {placeholder}
    {disabled}
    {onchange}
    {oninput}
    {onkeyup}
    {onblur}
    {...restProps}
  />
{:else if type === "number"}
  <input
    id={id ? id : uid}
    type="number"
    bind:value={value}
    {list}
    class="fp-input"
    style={`${getElementColors(colors).all} ${getElementSizes(sizes).all}`}
    {min}
    {max}
    {step}
    {placeholder}
    {disabled}
    {onchange}
    {oninput}
    {onkeyup}
    {onblur}
    {...restProps}
  />
{:else if type === "email"}
  <input
    id={id ? id : uid}
    type="email"
    bind:value={value}
    {list}
    class="fp-input"
    style={`${getElementColors(colors).all} ${getElementSizes(sizes).all}`}
    {placeholder}
    {disabled}
    {onchange}
    {oninput}
    {onkeyup}
    {onblur}
    {...restProps}
  />
{:else if type === "password"}
  <input
    id={id ? id : uid}
    type="password"
    bind:value={value}
    class="fp-input"
    style={`${getElementColors(colors).all} ${getElementSizes(sizes).all}`}
    {placeholder}
    {disabled}
    {onchange}
    {oninput}
    {onkeyup}
    {onblur}
    {...restProps}
  />
{/if}


<style>
  .fp-input {
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
      background-color: var(--element-bg-disabled);
      border-color: var(--element-border-color-disabled);
      color: var(--element-text-color-disabled);
      pointer-events: none;
    }
  }
</style>
