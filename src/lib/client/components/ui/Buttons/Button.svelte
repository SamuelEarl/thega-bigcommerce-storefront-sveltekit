<!-- TODO: Can I remove this migration note or do I still need to address this: @migration-task Error while migrating Svelte code: migrating this component would require adding a `$props` rune but there's already a variable named props.
     Rename the variable and try again or migrate by hand. -->
<script lang="ts">
  import { Icon } from "../Icons";
  import type { Snippet } from "svelte";
  import { getBtnColors, getElementSizes, getElementWidth } from "../../defaults";
  import type { IColors, ISizes } from "../../defaults";
  
  interface Props {
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "tertiary" | "alert";
    inverted?: boolean;
    colors?: IColors | null;
    sizes?: ISizes | null;
    width?: "auto" | "full";
    disabled?: boolean;
    formIsInvalid?: boolean;
    icon?: string;
    disabledIcon?: string;
    iconSide?: string;
    disabledIconShouldSpin?: boolean; // A spinning button icon can be used to provide user feedback for loading states (e.g. saving data, loading page content).
    rotateIcon?: string;
    rotateDisabledIcon?: string;
    disabledContent?: Snippet;
    children?: Snippet;
    // Forward Events:
    onclick: (event: Event) => void;
  }

  let {
    type = "button",
    variant = "primary",
    inverted = false,
    colors = null,
    sizes = null,
    width = "auto",
    disabled = false,
    formIsInvalid = false,
    icon = "",
    disabledIcon = "icomoon-free:spinner2",
    iconSide = "left",
    disabledIconShouldSpin = true,
    rotateIcon = "0deg",
    rotateDisabledIcon = "0deg",
    disabledContent,
    children,
    // Forward Events:
    onclick,
    ...restProps
  }: Props = $props();

  // If no button text snippets are passed to this component, then `textSnippetsExist` will be `false`.
  const textSnippetsExist = !!children || !!disabledContent;

  /**
   * NOTE: These `iconStyles` will only be applied to <Button> 
   * components that have both a `icon` and `disabledIcon` prop.
   * They will NOT be applied to icons that are passed in a snippet.
   */
  function getIconStyles() {
    let iconStyles = "";
    // Icon Buttons do not have any text. So if no button text snippets are passed to this component, then `textSnippetsExist` will be false and no `order` or `margin` styles will be set on the icon.
    if (textSnippetsExist) {
      if (iconSide === "left") {
        iconStyles = "order: -9999;";
      }
      if (iconSide === "right") {
        iconStyles = "order: 9999;";
      }
    }
    return iconStyles;
  }
</script>

<!-- NOTE: The `onclick` event will be triggered when any equivalent keyboard events occur (e.g. `onkeydown`), so only the `onclick` event is needed for interactive elements, such as buttons. So do not forward the `onkeydown` event because it appears to duplicate the functionality of the `onclick` event. -->
<button
  {type}
  class="fp-btn"
  style={`${getBtnColors(colors, variant, inverted)} ${getElementSizes(sizes, true).all} ${getElementWidth(width)}`}
  disabled={disabled || formIsInvalid}
  {...restProps}
  {onclick}
>
  <!-- Button Text -->
  {#if disabled}
    <!-- If the button is a "submit" button in a form and if the form is invalid then the button will be disabled. However, do NOT show the disabled text or icon. The disabled button will simply prevent the user from submitting the form. -->
    {#if type === "submit" && formIsInvalid}
      {@render children?.()}  
    {:else if disabledContent}
      {@render disabledContent()}
    {:else}
      {@render children?.()}  
    {/if}
  {:else}
    {@render children?.()}
  {/if}

  <!-- Button Icon -->
  <!-- If the icon and the disabledIcon both exist, then display the icon. If either the icon or disabledIcon is an empty string, then no icons will be displayed with the button. See the docs for details. -->
  {#if icon && disabledIcon}
    <!-- If the form is invalid, then do NOT show the disabled icon. See the note above the `formIsInvalid` conditional check for the button text. -->
    {#if type === "submit" && formIsInvalid}
      <Icon icon={icon} style={`${getIconStyles()} transform:rotate(${rotateIcon});`} />
    <!-- If the button is disabled, then... -->
    {:else if disabled}
      <!-- NOTE: You can NOT dynamically bind classes to a component instance, so the <Icon /> component has to be repeated a couple of times - once for the "fp-spin" class and once without. -->
      {#if disabledIconShouldSpin}
        <!-- ...show a spinning disabled icon. -->
        <Icon icon={disabledIcon} style={`${getIconStyles()}`} class="fp-spin" />
      {:else}
        <!-- ...or show a non-spinning disabled icon. -->
        <Icon icon={disabledIcon} style={`${getIconStyles()} transform:rotate(${rotateDisabledIcon});`} />
      {/if}
    <!-- If the button is not disabled, then show the icon. -->
    {:else}
      <Icon icon={icon} style={`${getIconStyles()} transform:rotate(${rotateIcon});`} />
    {/if}
  {/if}
</button>

<style>
  @media (--xs-up) {
    .fp-btn {
      border-width: var(--border-width);
      border-style:  var(--border-style);
      outline-width: var(--outline-hidden);
      outline-style: var(--outline-style);
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      justify-content: center; /* Center the text when the button is full width. */

      &:hover, &:focus {
        outline-width: var(--outline-width);
        outline-offset: var(--outline-offset);
      }

      &:disabled {
        pointer-events: none;
        filter: var(--disabled-btn-filter);
      }
    }
  }
</style>
