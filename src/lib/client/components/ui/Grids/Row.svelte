<script lang="ts">
  import { getContext } from "svelte";
  import { GRID_KEY } from "./Grid.svelte";
  import type { Snippet } from "svelte";

  interface Props {
    children?: Snippet
  }

  let { 
    children,
  }: Props = $props();

  let {
    gap,
    contain,
  } = getContext(GRID_KEY);

  // If `contain` is true, then remove the left and right margins to expand the row to the outside of the grid. If `contain` is false, then don't do anything to the row margins.
  const style = contain ? `margin-left: -${gap.c / 2}px; margin-right: -${gap.c / 2}px;` : null;
</script>

<div class="fp-flex-row" {style}>
  {@render children?.()}
</div>

<style>
  .fp-flex-row {
    display: flex;
    flex-wrap: wrap;
  }
</style>
