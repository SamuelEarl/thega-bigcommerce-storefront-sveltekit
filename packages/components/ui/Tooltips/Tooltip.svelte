<!-- 
  * Look at the demo link on this page for a tooltip component that uses tippy.js: https://svelte.dev/docs/svelte/@attach#Attachment-factories
      * This is the direct link to that tooltip demo: https://svelte.dev/playground/untitled?version=5.37.2#H4sIAAAAAAAAA3VS7W7bMAx8FU7bEKeL07T7CKAmxfav71D3h2zRiTZFFCQ6bRb43Qc5dpy1GwQDBnlH8o48Cqd2KKT4rphVtRUzURuLUcjHo-CDT6kUELMB-MP7edyj5RQrVcR_xStyjI6jkGIVq2A83xeuYLPzFBjYeH-AOtAOJt3__Gec3BUuQSwy9GxYw4fIijGbPKC19G4y7UF14yo25ICJLBuf9YwpHFO64IDcBAeZI41TWN8P8YIrcpEHHqxPs3S4GRzPnduuE1-U6hlzjZEDHe4KPgHaDtgWbnU9CnUr43zDUBqn5V7ZBtfHvnQL1ydE2TCTg2Nv_BspbefYA-0xwA5T_RPjxI58sNgh5MZSqeyg8FErVnmnKg9E_DRKz_NyI-H9crk8iytV9WsTqHE6r8hSkLBXIUvA0YA-8bw1jCORgsaQB6VNEyUs5rcBd-esV1obtxnisJh_u0zXxjIGCTqQz-NWaXrObvwLpO-zf4GwKbMFpHcNi_nNdFh7elejnoI5KBdNugQJjtw4XtsvZ-C9cUXKEmsKeOlONL8xjfzlctZ-HRImk1EeDU1VGck2F75YrFlCpWyVfV18hLz3M5WejpYy-R6U38LVJQY-JRemr3yWf0EiWaOh0-5VQMevt1ISM-3-t9F2PNj-iMRMML6wkBwabJ9mgpWxz8ZpIWtlI7Z_AENPukkmBAAA
  * The demo that is linked above shows how to theme the Tippy elements, but this link also shows how to style individual components of the Tippy elements: https://atomiks.github.io/tippyjs/v6/themes/#tippy-elements
  * STYLING TIP: To inspect the Tippy elements and styles, in Chrome click the "Toggle device toolbar" button to show the mobile view. The hoverable elements have to be clicked in this view and when the popups appear they remain visible in the DOM until to click away from them, which allows you to inspect the Tippy elements and styles.
-->

<script lang="ts">
  import tippy from "tippy.js";
  import type { Snippet } from "svelte";
  import type { Attachment } from "svelte/attachments";

  interface Props {
    content?: string;
    children?: Snippet;
  }

  let {
    content = "",
    children,
  }: Props = $props();

  function tooltip(content: string): Attachment {
		return (element) => {
			const tooltip = tippy(element, {
        content,
        theme: "default",
      });
			return tooltip.destroy;
		};
	}
</script>

<span class="tooltip-wrapper" {@attach tooltip(content)}>
  {@render children?.()}
</span>


<style>
  .tooltip-wrapper {
    display: inline-block;
  }

  /* NOTE: Look at the notes at the top of this file for theming help. */
  :global {
    /* Popup box styles */
		[data-tippy-root] .tippy-box[data-theme~="default"] {
      position: relative;
			background-color: var(--neutral-11);
      border: 1px solid var(--neutral-5);
      border-radius: var(--radius);
			color: var(--white);
			padding: 0.4rem 0.6rem;
			filter: drop-shadow(3px 3px 6px rgb(0 0 0 / 0.4));
      /* This will preserve any line breaks in the Tippy content. */
      white-space: pre-line;

			* {
				transition: none;
			}
		}

    /* Arrow styles */
    [data-tippy-root] .tippy-box[data-theme~="default"] > .tippy-arrow {
			--arrow-size: 0.4rem;
			content: "";
			position: absolute;
			left: calc(50% - var(--arrow-size));
			border: var(--arrow-size) solid transparent;
		}

    /* Popup box is above the hoverable element and arrow is pointing down from the popup box */
    [data-tippy-root] .tippy-box[data-theme~="default"][data-placement^="top"] > .tippy-arrow {
			bottom: calc((-2 * var(--arrow-size)) + 2px);
			border-top-color: var(--neutral-11);
		}

    /* Popup box is below the hoverable element and arrow is pointing up from the popup box */
    [data-tippy-root] .tippy-box[data-theme~="default"][data-placement^="bottom"] > .tippy-arrow {
			top: calc((-2 * var(--arrow-size)) + 2px);
			border-bottom-color: var(--neutral-11);
		}
	}
</style>
