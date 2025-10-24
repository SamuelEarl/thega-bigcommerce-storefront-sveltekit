<script lang="ts">
  import { onMount } from "svelte";
  import { Button } from "../Buttons";
  import type { Snippet } from "svelte";

  interface Props {
    title?: string;
    scrollingBody?: boolean;
    focusElement?: string;
    disabled?: boolean;
    showCloseBtn?: boolean;
    modalWidth?: "auto" | "100%";
    modalBackgroundColor?: string;
    modalBody: Snippet;
    modalFooterLeft?: Snippet;
    modalFooterRight?: Snippet;
    onCloseModalCallback: (event: CustomEvent) => void;
  }

  let {
    title = "",
    scrollingBody = true,
    focusElement = "",
    disabled = false,
    showCloseBtn = true,
    modalWidth = "auto",
    modalBackgroundColor = "var(--white)",
    modalBody,
    modalFooterLeft,
    modalFooterRight,
    onCloseModalCallback,
  }: Props = $props();

  onMount(() => {
    if (scrollingBody) {
      setScrollingBody();
    }
    if (focusElement) {
      setFocus();
    }
  });

  // If scrollingBody = true, then set a static height for the #modal-body-wrapper and set its overflow property to "auto" so a scrollbar will appear.
  function setScrollingBody() {
    // Get window height: https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
    let windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // Get the #modal-content-container and its height.
    let modalContentContainer = document.getElementById("modal-content-container");
    let modalContentContainerHeight = modalContentContainer.getBoundingClientRect().height;
    // Get the #modal-body-wrapper and its height.
    let modalBodyWrapper = document.getElementById("modal-body-wrapper");
    let modalBodyWrapperHeight = modalBodyWrapper.getBoundingClientRect().height;
    // Calculate the height of everything in the #modal-content-container except for the #modal-body-wrapper.
    let modalTopAndBottomHeights = modalContentContainerHeight - modalBodyWrapperHeight;
    // Set the #modal-body-wrapper height to equal the remaining window space after the modalTopAndBottomHeights have been removed from the remaining window space calculation.
    modalBodyWrapper.style.height = (windowHeight - modalTopAndBottomHeights) + "px";
    // Now that a static height has been set for the #modal-body-wrapper, set its overflow property to "auto" so a scrollbar will appear.
    modalBodyWrapper.style.overflow = "auto";
  }

  /**
   * When the modal is mounted in the DOM, set the focus on the element whose ID was passed to the `focusElement` prop.
   */
  async function setFocus() {
    try {
      document.getElementById(focusElement)?.focus();
    }
    catch(err) {
      console.error("setFocus ERROR:", err);
    }
  }

  function setBodyBorderRadius() {
    let bodyBorderRadius = "";
    // If there is no title, which means there will be no header, then set the top of the body to be rounded.
    if (!title) {
      bodyBorderRadius = "border-radius: var(--radius) var(--radius) 0 0;";
    }
    // If there is no footer, then set the bottom of the body to be rounded.
    if (!modalFooterLeft && !modalFooterRight) {
      bodyBorderRadius = "border-radius: 0 0 var(--radius) var(--radius);";
    }
    // If there is no header and no footer, then set all corners of the body to be rounded.
    if (!title && !modalFooterLeft && !modalFooterRight) {
      bodyBorderRadius = "border-radius: var(--radius);";
    }
    return bodyBorderRadius;
  }
</script>

{#if showCloseBtn}
  <div id="close-btn-container">
    <Button
      id="close"
      icon="ic:baseline-close"
      colors={{
        bg: "transparent",
        fg: "var(--white)",
        br: "transparent",
        ol: "var(--white)",
      }}
      sizes={{
        fs: 6,
        pv: 2,
        ph: 2,
      }}
      {disabled}
      onclick={onCloseModalCallback}
    ></Button>
  </div>
{/if}

<div id="fp-modal">
  <div id="modal-content-container" class="fp-animatetop">
    <div id="modal-content" style={`width: ${modalWidth}; background-color: ${modalBackgroundColor};`}>
      {#if title}
        <header id="modal-header">
          <!-- svelte-ignore   a11y_no_noninteractive_tabindex -->
          <h3 id="modal-title" tabindex="0">{title}</h3>
        </header>
      {/if}
      <!-- If the header and footer are excluded, then set a rounded border-radius on the `modal-body-wrapper`. -->
      <div id="modal-body-wrapper" style={setBodyBorderRadius()}>
        {@render modalBody?.()}
      </div>
      {#if !!modalFooterLeft || !!modalFooterRight}
        <footer id="modal-footer">
          <div id="modal-footer-left">
            {@render modalFooterLeft?.()}
          </div>
          <div id="modal-footer-right">
            {@render modalFooterRight?.()}
          </div>
        </footer>
      {/if}
    </div>
  </div>
</div>


<style>
  @media (--xs-up) {
    /* Prevent page scrolling when a modal is open:
       https://www.reddit.com/r/css/comments/137kr90/is_there_a_way_to_prevent_scrollthrough_when/ */
    :global(body:has(#fp-modal)) {
      overflow: hidden;
    }

    #close-btn-container {
      position: fixed;
      top: 0px;
      right: 0px;
      z-index: 1000;
      border-radius: var(--radius);
      background-color: rgba(0, 0, 0, 0.4);
    }

    /* The Modal (background) */
    #fp-modal {
      position: fixed; /* Stay in place */
      z-index: 100; /* Sit on top */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      display: flex; /* This will center the #modal-content-container vertically */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

      & #modal-content-container {
        display: flex;
        justify-content: center;
        position: relative;
        width: 100%;
        padding: var(--size-1);
        margin: auto;

        & #modal-content {
          /* The `border-radius` style will prevent any `modal-content` background styles from spilling outside of the `modal-body-wrapper`. */
          border-radius: var(--radius);
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

          & #modal-header {
            padding: var(--size-2);
            border-radius: var(--radius) var(--radius) 0 0;
            box-shadow: 0 0 5px rgba(0,0,0,0.3);

            & h3 {
              margin: 0;
            }
          }

          & #modal-footer {
            display: flex;
            flex-direction: column;
            gap: 7px;
            padding: var(--size-2);
            border-radius: 0 0 var(--radius) var(--radius);
            box-shadow: 0 0 5px rgba(0,0,0,0.3);

            & #modal-footer-left, & #modal-footer-right {
              display: flex;
              flex-direction: column;
              gap: 7px;
            }
          }
        }
      }
    }
  }

  /* @media lg */
  @media (--lg-up) {
    #fp-modal {

      & #modal-content-container {
        width: 950px;

        & #modal-content {

          & #modal-header {
            padding: var(--size-4);
          }

          & #modal-footer {
            flex-direction: row;
            justify-content: space-between;
            padding: var(--size-4);

            & #modal-footer-left, & #modal-footer-right {
              flex-direction: row;
            }

            & #modal-footer-left {
              justify-content: flex-start;
            }

            & #modal-footer-right {
              justify-content: flex-end;
            }
          }
        }
      }
    }
  }
</style>
