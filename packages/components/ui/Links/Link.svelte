<script lang="ts">
  import type { Snippet } from "svelte";
  import { getBtnColors, getElementSizes, getElementWidth } from "../../defaults";
  import type { IColors, ISizes } from "../../defaults";

  interface Props {
    href: string;
    btnStyles?: boolean;
    variant?: "primary" | "secondary" | "tertiary";
    inverted?: boolean;
    colors?: IColors | null;
    sizes?: ISizes | null;
    width?: "auto" | "full";
    disabled?: boolean;
    disabledContent?: Snippet;
    children?: Snippet;
  }

  let {
    href,
    btnStyles = false,
    variant = "primary",
    inverted = false,
    colors = null,
    sizes = null,
    width = "auto",
    disabled = false,
    disabledContent,
    children,
    ...restProps
  }: Props = $props();

  function getLinkColor(variant: string) {
    return `color: var(--${variant}-bg); border-bottom-color: var(--${variant}-bg); outline-color: var(--${variant}-bg);`;
  }
</script>

{#if btnStyles}
  <a
    {href}
    {...restProps}
    class="fp-link btn-styles"
    class:disabled={disabled}
    tabindex={disabled ? -1 : 0}
    style={`${getBtnColors(colors, variant, inverted)} ${getElementSizes(sizes, true).all} ${getElementWidth(width)}`}
  >
    {#if disabled && disabledContent}
      {@render disabledContent()}
    {:else}
      {@render children?.()}  
    {/if}
  </a>
{:else}
  <a
    {href}
    {...restProps}
    class="fp-link link-styles"
    style={`${getLinkColor(variant)}`}
    class:disabled={disabled}
    tabindex={disabled ? -1 : 0}
  >
    {@render children?.()}
  </a>
{/if}

<style>
  @media (--xs-up) {
    .disabled {
      pointer-events: none;
      filter: var(--disabled-btn-filter);
    }

    .fp-link {
      text-decoration-line: none;
      outline-width: var(--outline-hidden);
      outline-style: var(--outline-style);
      outline-offset: var(--outline-offset);
      cursor: pointer;

      &.link-styles {
        border-bottom: 1px dotted;

        &:hover {
          border-bottom-color: transparent !important;
        }

        &:focus {
          border-radius: var(--radius);
          outline-width: var(--outline-width);
        }
      }

      &.btn-styles {
        border-width: var(--border-width);
        border-style:  var(--border-style);
        border-radius: var(--radius);
        display: inline-flex;
        align-items: center;
        justify-content: center; /* Center the text when the button is full width. */

        &:hover, &:focus {
          outline-width: var(--outline-width);
        }
      }
    }
  }
</style>
