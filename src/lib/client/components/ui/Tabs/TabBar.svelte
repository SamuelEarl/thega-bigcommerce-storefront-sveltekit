<script lang="ts">
  import { setContext } from "svelte";
  import type { Snippet } from "svelte";

  interface Props {
    tabStyle?: string; // Possible values: "fill", "line"
    children?: Snippet
  }

  let {
    tabStyle = "line", 
    children
  }: Props = $props();

  setContext("tabStyle", tabStyle);
</script>

<div class={`fp-tabs-tab-bar ${tabStyle}`}>
	{@render children?.()}
</div>

<style>
  @media (--xs-up) {
    .fp-tabs-tab-bar {
      display: flex;

      &.fill {
        border: var(--border);
        border-radius: var(--radius);
        overflow: hidden;
        background-color: var(--element-bg);
        color: var(--text-color);
      }

      &.line {
        border-bottom: var(--border);
      }

      &.tab {
        padding: calc(1.25 * var(--size-1)) calc(5 * var(--radius)) 0 calc(5 * var(--radius));
        border-radius: var(--radius);
        overflow: hidden;
        background-color: var(--border-color);
        color: var(--text-color);
      }
    }
  }
</style>
