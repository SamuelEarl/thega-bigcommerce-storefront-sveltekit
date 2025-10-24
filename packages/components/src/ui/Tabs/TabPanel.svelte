<script lang="ts">
	import { getContext } from "svelte";
	import type { Snippet } from "svelte";
  import { TABS_KEY } from "./TabsContainer.svelte";

  interface Props {
    children?: Snippet
  }

  let { children }: Props = $props();

	const panel = {};
	const {
    registerPanel, 
    selectedPanel,
    panelPadding, 
  } = getContext(TABS_KEY);

	registerPanel(panel);
</script>

{#if $selectedPanel === panel}
  <div style={`padding: var(--size-${panelPadding.top}) var(--size-${panelPadding.right}) var(--size-${panelPadding.bottom}) var(--size-${panelPadding.left});`}>
    {@render children?.()}
  </div>
{/if}
