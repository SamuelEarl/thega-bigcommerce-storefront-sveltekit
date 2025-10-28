<script lang="ts" module>
  export const GRID_KEY = Symbol();
</script>

<script lang="ts">
  import { setContext } from "svelte";
  import type { Snippet } from "svelte";

  interface Props {
    gap?: {r: number, c: number};
    equalColWidths?: boolean;
    contain?: boolean;
    children?: Snippet;
  }

  let {
    gap = {r: 0, c: 0},
    equalColWidths = false,
    contain = false,
    children
  }: Props = $props();

  setContext(GRID_KEY, {
    "gap": gap,
    "equalColWidths": equalColWidths,
    "contain": contain,
  });

  // The `-${gap.r / 2}px` style removes the gap.r setting from the grid's outer container so that the row gap is only between the rows as opposed to also being on the outside of the rows.
  // The `-${gap.c / 2}px` style removes the gap.c setting from the grid's outer container so that the column gap is only between the columns as opposed to also being on the outside of the columns.
  // If `contain` is true, then the grid will be centered, have a max-width of --lg-min, and the top and bottom margins will be negated (i.e. essentially removed). If `contain` is false, then the grid will stretch to fill the available space and the margin will be set to negative values to remove the gaps from the outer container.
  const style = contain ? `max-width: var(--lg-min); margin: -${gap.r / 2}px auto;` : `margin: -${gap.r / 2}px -${gap.c / 2}px`;
</script>

<div 
  class="fp-flex-grid"
  {style}
>
  {@render children?.()}
</div>
