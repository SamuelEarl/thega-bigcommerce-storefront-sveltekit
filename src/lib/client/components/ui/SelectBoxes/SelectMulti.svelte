<script lang="ts">
  import { Button, CheckboxGroup, Modal } from "$lib/client/components"
  import { getElementColors, getElementSizes } from "../../defaults";
  import type { IColors, ISizes } from "../../defaults";

  interface Props {
    title?: string;
    colors?: IColors | null;
    sizes?: ISizes | null;
    optionsArray: any;
    selectedValues?: any;
    disabled?: boolean;
  }

  let {
    title = "Select all that apply",
    colors = null,
    sizes = null,
    optionsArray,
    selectedValues = $bindable([]),
    disabled = false,
    ...restProps
  }: Props = $props();

  let showMultiSelectModal = $state(false);

  /**
   * This function will add the values that the user selects to the `selectedValues` array in the order that the user selects them.
   */
  function changeHandler(event: InputEvent, index: number) {
    // Prevent the modal from opening unnecessarily.
    event.preventDefault();

    // If the user click the 'x' on the pill, then remove the option.
    if (index > -1) {
      selectedValues.splice(index, 1);
      return;
    }

    // If the user checks or unchecks the checkboxes, then handle the onchange event.
    const value = event.target.value;
    // If the selected value is already in the `selectedValues` array, then remove it.
    if (selectedValues.includes(value)) {
      const index = selectedValues.indexOf(value);
      if (index > -1) {
        selectedValues.splice(index, 1);
      }
    }
    // Otherwise add the selected value to the `selectedValues` array.
    else {
      selectedValues.push(value);
    }
  }
</script>

<div class="container" {...restProps}>
  <div class="select-btn-container">
    <Button 
      {disabled}
      {sizes}
      onclick={(event) => {
        event.preventDefault();
        showMultiSelectModal = true;
      }}
    >
      Select
    </Button>
  </div>
  <div
    class="pill-container"
    class:disabled={disabled}
    style={`${getElementColors(colors).all} ${getElementSizes(sizes).all}`}
  >
    {#if selectedValues.length === 0}
      <em>No values selected</em>
    {:else}
      {#each selectedValues as value, index}
        <span
          class="value-pill"
          class:disabled={disabled}
        >
          <span class="value-text">
            {value}
          </span> 
          <button
            class="remove-value"
            onclick={(event) => changeHandler(event, index)}
          >
            &times;
          </button>
        </span>
      {/each}
    {/if}
  </div>
</div>
{#if showMultiSelectModal}
  <Modal
    {title}
    scrollingBody={false}
    focusElement="modal-title"
    closeModal={(event) => {
      event.preventDefault();
      showMultiSelectModal = false;
    }}
  >
    {#snippet modalBody()}
      <div class="modal-body">
        <CheckboxGroup
          {optionsArray}
          {selectedValues}
          {disabled}
          onchange={changeHandler}
        />
        <br>
        <div class="close-btn-container">
          <Button 
            {disabled}
            onclick={(event) => {
              event.preventDefault();
              showMultiSelectModal = false;
            }}
          >
            Close
          </Button>
        </div>
      </div>
    {/snippet}
  </Modal>
{/if}

<style>
  @media (--xs-up) {
    .container {
      display: flex;
      align-items: center;
      gap: 5px;

      & .pill-container {
        display: flex;
        align-items: center;
        gap: 5px;
        overflow-x: auto;
        overflow-y: hidden;
        width: 100%;
        border-width: var(--border-width);
        border-style: var(--border-style);
        border-radius: var(--radius);

        &.disabled {
          background-color: var(--element-bg-disabled) !important;
          border-color: var(--element-border-color-disabled) !important;
          color: var(--element-text-color-disabled) !important;
          pointer-events: none;
        }

        & .value-pill {
          display: flex;
          align-items: center;
          margin-right: 5px;
          padding: 0px 5px 0px 10px;
          border-radius: 20px;
          background-color: var(--primary-bg);
          color: var(--primary-fg);
          outline-width: var(--outline-hidden);
          outline-style: var(--outline-style);
          outline-color: var(--primary-bg);

          &:hover, &:focus {
            outline-width: var(--outline-width) !important;
            outline-offset: var(--outline-offset) !important;
          }

          &.disabled {
            filter: var(--disabled-btn-filter);
          }

          & .value-text {
            white-space: nowrap;
            cursor: default;
          }

          & .remove-value {
            padding: 0 5px 0 10px;
            cursor: pointer;
          }
        }
      }
    }

    .modal-body {
      padding: var(--size-5);

      & .close-btn-container {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
