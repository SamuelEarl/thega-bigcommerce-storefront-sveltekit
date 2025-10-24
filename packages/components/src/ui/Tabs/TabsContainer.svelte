<script lang="ts" module>
  export let TABS_KEY = Symbol();
</script>

<script lang="ts">
	import { setContext, onDestroy } from "svelte";
	import type { Snippet } from "svelte";
	import type { ISizes } from "../../defaults";
	import { writable } from "svelte/store";

	interface Props {
		border?: boolean;
		containerPadding?: string;
		tabSizes?: ISizes | null;
		panelPadding?: { top: number; bottom: number; left: number; right: number; };
		children?: Snippet
	}

	let {
		border = true,
		containerPadding = "var(--size-4)",
		tabSizes = null,
		panelPadding = {
			top: 2,
			bottom: 2,
			left: 2,
			right: 2,
		},
		children
	}: Props = $props();

	const tabsContainer = [];
	const panels = [];
	const selectedTab = writable(null);
	const selectedPanel = writable(null);

	setContext(TABS_KEY, {
		registerTab: tab => {
			tabsContainer.push(tab);
			selectedTab.update(current => current || tab);
			
			onDestroy(() => {
				const i = tabsContainer.indexOf(tab);
				tabsContainer.splice(i, 1);
				selectedTab.update(current => current === tab ? (tabsContainer[i] || tabsContainer[tabsContainer.length - 1]) : current);
			});
		},

		registerPanel: panel => {
			panels.push(panel);
			selectedPanel.update(current => current || panel);
			
			onDestroy(() => {
				const i = panels.indexOf(panel);
				panels.splice(i, 1);
				selectedPanel.update(current => current === panel ? (panels[i] || panels[panels.length - 1]) : current);
			});
		},

		selectTab: tab => {
			const i = tabsContainer.indexOf(tab);
			selectedTab.set(tab);
			selectedPanel.set(panels[i]);
		},

		selectedTab,
		selectedPanel,
		tabSizes,
    panelPadding,
	});
</script>

<!-- If `border` is true, then include the border styles. -->
<div
  style={`${border ? "border:var(--border); border-radius:var(--radius);" : ""} padding:${containerPadding};`}
>
	{@render children?.()}
</div>
