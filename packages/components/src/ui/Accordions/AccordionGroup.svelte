<script lang="ts" module>
  import { sizes } from "../../defaults";
  import type { IColors, ISizes } from "../../defaults";

  export let ACCORDION_KEY = Symbol();
</script>

<script lang="ts">
  import { setContext } from "svelte";
  import type { Snippet } from "svelte";

  interface Props {
    groupBorder?: boolean;
    groupPadding?: string;
    btnColors?: IColors | null;
    btnSizes?: ISizes;
    spaceBetweenAccordions?: string;
    panelBorders?: boolean;
    panelBgColors?: string;
    children?: Snippet
  }

  let {
    groupBorder = false,
    groupPadding = "var(size-0)",
    btnColors = null,
    btnSizes = sizes,
    spaceBetweenAccordions = "var(--size-4)",
    panelBorders = true,
    panelBgColors = "transparent",
    children,
    ...restProps
  }: Props = $props();

  setContext(ACCORDION_KEY, {
    "btnColors": btnColors,
    "btnSizes": btnSizes,
    "spaceBetweenAccordions": spaceBetweenAccordions,
    "panelBorders": panelBorders,
    "panelBgColors": panelBgColors,
  });
</script>

<div
  class={`fp-accordion-group ${groupBorder ? "group-border" : ""}`} 
  style={`padding:${groupPadding};`}
  {...restProps}
>
  {@render children?.()}
</div>

<style>
  .fp-accordion-group.group-border {
    border: var(--border);
    border-radius: var(--radius);
  }
</style>
