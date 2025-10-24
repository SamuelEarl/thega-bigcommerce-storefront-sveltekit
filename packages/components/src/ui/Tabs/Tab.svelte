<script lang="ts">
	import { getContext } from "svelte";
  import type { Snippet } from "svelte";
	import { TABS_KEY } from "./TabsContainer.svelte";
  import { getElementSizes } from "../../defaults";

  interface Props {
    children?: Snippet
  }

  let {
    children, 
    ...restProps 
  }: Props = $props();

	const tab = {};
	const {
    registerTab, 
    selectTab, 
    selectedTab, 
    tabSizes,
  } = getContext(TABS_KEY);
  let tabStyle = getContext("tabStyle");

	registerTab(tab);
</script>

<button
  class={`fp-tabs-tab ${tabStyle}`}
  class:active={$selectedTab === tab}
  style={`${getElementSizes(tabSizes).all}`}
  {...restProps}
  onclick={() => selectTab(tab)}
  onkeyup={() => selectTab(tab)}
>
	{@render children?.()}
</button>

<style>
  @media (--xs-up) {
    .fp-tabs-tab {
      cursor: pointer;

      &.active {
        pointer-events: none;
      }

      &.fill {

        &:hover, &.active {
          background-color: var(--border-color);
        }
      }

      &.line {
        /* This creates a border-bottom for the Tab that is twice as thick as the TabBar's border-bottom. */
        border-bottom: calc(2 * (var(--border-width))) solid transparent;
        /* This will cause the Tab's border-bottom to lay on top of the TabBar's border-bottom so they overlap rather than the Tab's border-bottom stacking on top of the TabBar's border-bottom.  */
        margin-bottom: calc(-1 * (var(--border-width)));

        &:hover {
          border-color: var(--border-color);
        }

        &.active {
          border-color: var(--text-color);
        }
      }

      &.tab {
        position: relative;
        border-radius: var(--radius) var(--radius) 0 0;

        &:hover {
          background-color: var(--neutral-2);
        }
        
        &.active {
          background-color: var(--white);

          /* Bottom left (inverted) corner */
          &::before {
            content: "";
            position: absolute;
            bottom: 0; /* Adjust position for desired corner */
            left: calc(-2 * var(--radius)); /* Adjust position for desired corner */
            /* Size of the cutout */
            width: calc(2 * var(--radius));
            /* Size of the cutout */
            height: var(--radius);
            border-radius: 0 0 var(--radius) 0; /* Example: inverted bottom-left */
            background-color: transparent;
            /* box-shadow matching parent background color */
            box-shadow: var(--radius) var(--radius) 0 var(--radius) var(--white);
          }

          /* Bottom right (inverted) corner */
          &::after {
            content: "";
            position: absolute;
            bottom: 0; /* Adjust position for desired corner */
            right: calc(-2 * var(--radius)); /* Adjust position for desired corner */
            /* Size of the cutout */
            width: calc(2 * var(--radius));
            /* Size of the cutout */
            height: var(--radius);
            border-radius: 0 0 0 var(--radius); /* Example: inverted bottom-right */
            background-color: transparent;
            /* box-shadow matching parent background color */
            box-shadow: calc(-1 * var(--radius)) var(--radius) 0 var(--radius) var(--white);
          }
        }
      }
    }
  }
</style>
