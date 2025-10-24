<script lang="ts">
  import { getContext } from "svelte";
  import { slide } from "svelte/transition";
  import type { Snippet } from "svelte";
  import { ACCORDION_KEY } from "./AccordionGroup.svelte";
  import { getElementColors, getElementSizes } from "../../defaults";

  const {
    btnColors,
    btnSizes,
    spaceBetweenAccordions,
    panelBorders,
    panelBgColors,
  } = getContext(ACCORDION_KEY);

  interface Props {
    wrapperId?: string;
    wrapperClasses?: string;
    btnId?: string;
    btnClasses?: string;
    panelId?: string;
    panelClasses?: string;
    btnText: string;
    open?: boolean;
    panelBorder?: boolean;
    panelBgColor?: string;
    children?: Snippet;
  }

  let {
    wrapperId = "",
    wrapperClasses = "",
    btnId = "",
    btnClasses = "",
    panelId = "",
    panelClasses = "",
    btnText,
    open = false,
    panelBorder = panelBorders,
    panelBgColor = panelBgColors,
    children,
  }: Props = $props();

  function getAccordionPanelPaddingTop() {
    let paddingTop = btnSizes ? `calc(2 * var(--size-${btnSizes.pv}));` : "calc(2 * var(--padding-v-default))";
    if (panelBorder) {
      // Add a padding-top value that is equal to (2 * btnSizes.pv) + var(--radius) to compensate for the negative margin-top value in the CSS styles.
      paddingTop = btnSizes ? `calc((2 * var(--size-${btnSizes.pv})) + var(--radius));` : `calc((2 * var(--padding-v-default)) + var(--radius));`;
    }
    return paddingTop;
  }
</script>

<!-- Accordion Wrapper -->
<div id={wrapperId} class={`fp-accordion-wrapper ${wrapperClasses}`} style={`margin-bottom: ${spaceBetweenAccordions}; outline-color: ${btnColors && btnColors.ol ? btnColors.ol : "var(--element-ol)"};`}>
  <!-- Accordion Button -->
  <button
    id={btnId}
    class={`fp-accordion-btn ${btnClasses}`}
    class:active={open}
    style={`${getElementColors(btnColors).all} ${getElementSizes(btnSizes).all}`}
    onclick={() => {
      open = !open;
      // NOTE: Do not use an `onkeyup` event listener after this `onclick` listener because they will conflict with each other. Only the `onclick` listener is needed for interactive elements such as buttons.
    }}
  >
    {btnText}
  </button>

  <!-- Accordion Panel -->
  {#if open}
    <div
      id={panelId}
      class={`fp-accordion-panel ${panelClasses}`}
      class:fp-accordion-panel-border={panelBorder}
      style={`padding-top: ${getAccordionPanelPaddingTop()}; padding-right: var(--size-${btnSizes.ph}); padding-bottom: var(--size-${btnSizes.pv}); padding-left: var(--size-${btnSizes.ph}); font-size: var(--size-${btnSizes.f}); background-color: ${panelBgColor};`}
      transition:slide
    >
      {@render children?.()}
    </div>
  {/if}
</div>


<style>
  .fp-accordion-wrapper {
    outline-width: var(--outline-hidden);
    outline-style: var(--outline-style);
    border-radius: var(--radius);

    &:hover, &:focus-within {
      outline-width: var(--outline-width);
      outline-offset: var(--outline-offset);
    }

    &:last-child {
      margin-bottom: 0 !important;
    }

    & .fp-accordion-btn {
      width: 100%;
      text-align: left;
      border-width: var(--border-width);
      border-style: var(--border-style);
      border-radius: var(--radius);
      outline-width: var(--outline-hidden);
      /* outline-style: var(--outline-style); */
      cursor: pointer;
      /* The z-index value keeps the button on top of the panel when the panel opens. This prevents the button from getting covered up if the panel has a large negative margin-top value (i.e. a large btnSizes.pv or large --radius value). */
      z-index: 1;

      &:after {
        content: "+"; /* Unicode character for "plus" sign (+) */
        font-weight: bold;
        color: inherit;
        float: right;
        margin-left: 5px;
      }

      &.active:after {
        content: "−"; /* Unicode character for "minus" sign (-) */
      }
    }

    & .fp-accordion-panel-border {
      border: var(--border);
      border-top: none;
      border-radius: 0 0 var(--radius) var(--radius);
      /* Move the panel up by the amount of the --radius value to remove the gap between the accordion button and the panel. */
      margin-top: calc(-1 * var(--radius));
      /* The padding-top value is handled by the getAccordionPanelPaddingTop() function. */
      margin-bottom: 10px;
    }
  }
</style>
