<script lang="ts">
  import { getElementColors, getElementSizes } from "../../defaults";
  import type { IColors, ISizes } from "../../defaults";

  interface Props {
    value: string;
    colors?: IColors | null;
    sizes?: ISizes | null;
    showHr?: boolean;
    showMin?: boolean;
    showSec?: boolean;
    showAMPM?: boolean;
  }

  let {
    value = $bindable(),
    colors = null,
    sizes = {
      pv: 0, 
      ph: 0,
    },
    showHr = true,
    showMin = true,
    showSec = true,
    showAMPM = true,
  }: Props = $props();

  // The format of the time sting is "HH:MM:SS AM".
  // These string methods will extract the parts of the time from the time string.
  let [ hours, minutes, secAMPM ] = value?.split(":");
  let [ seconds, period ] = secAMPM?.split(" ");

  let hr: string = $state(hours);
  let min: string = $state(minutes);
  let sec: string = $state(seconds);
  let ampm: string = $state(period);

  let hourInput = $state();
  let minInput = $state();
  let secInput = $state();

  $effect(() => {
    const hours = String(hr).padStart(2, "0");
    const minutes = String(min).padStart(2, "0");
    const seconds = String(sec).padStart(2, "0");
    value = `${hours}:${minutes}:${seconds} ${ampm}`;
  });

  function validateTime(event: Event, part: "hr"|"min"|"sec") {
    if (part === "hr") {
      if (hr < "1") {
        hr = "01";
      }
      if (hr > "12") {
        hr = "12";
      }
    }
    if (part === "min") {
      if (min < "0") {
        min = "00";
      }
      if (min > "59") {
        min = "59";
      }
    }
    if (part === "sec") {
      if (sec < "0") {
        sec = "00";
      }
      if (sec > "59") {
        sec = "59";
      }
    }
    // Pad single digits with a leading zero.
    event.target.value = event?.target?.value?.padStart(2, "0");
  }
</script>

<div class="fp-time-picker">
  <div
    class="time-container"
    style={`${getElementColors(colors).all} ${getElementSizes(sizes).all}`}
  >
    {#if showHr}
      <div class="section-container hours">
        <label class="label-wrapper">
          <input
            type="number"
            bind:value={hr}
            bind:this={hourInput}
            placeholder="HH"
            min="1"
            max="12"
            step="1"
            onfocus={() => hourInput.select()}
            onchange={(e) => validateTime(e, "hr")}
          />
          <span class="label-text hr">HOURS</span>
        </label>
      </div>
    {/if}
    {#if showHr && (showMin || showSec)}
      <div class="colon">
        <span>:</span>
        <span class="label-text">&nbsp;</span>
      </div>
    {/if}
    {#if showMin}
      <div class="section-container minutes">
        <label class="label-wrapper">
          <input
            type="number"
            bind:value={min}
            bind:this={minInput}
            placeholder="MM"
            min="0"
            max="59"
            step="1"
            onfocus={() => minInput.select()}
            onchange={(e) => validateTime(e, "min")}
          />
          <span class="label-text min">MINUTES</span>
        </label>
      </div>
    {/if}
    {#if showMin && showSec}
      <div class="colon">
        <span>:</span>
        <span class="label-text">&nbsp;</span>
      </div>
    {/if}
    {#if showSec}
      <div class="section-container seconds">
        <label class="label-wrapper">
          <input
            type="number"
            bind:value={sec}
            bind:this={secInput}
            placeholder="SS"
            min="0"
            max="59"
            step="1"
            onfocus={() => secInput.select()}
            onchange={(e) => validateTime(e, "sec")}
          />
          <span class="label-text sec">SECONDS</span>
        </label>
      </div>
    {/if}
  </div>

  {#if showAMPM}
    <div class="ampm-container">
      <label class="label-wrapper">
        <button
          class="ampm-btn"
          onclick={() => {
            if (ampm === "AM") ampm = "PM";
            else ampm = "AM";
          }}
        >
          <span class="main-btn-text">{ampm}</span>
          <span class="label-text sec">AM/PM</span>
        </button>
      </label>
    </div>
  {/if}
</div>

<style>
  @media (--xs-up) {
    .fp-time-picker {
      display: flex;
      gap: calc(1.25 * var(--size-1));

      .time-container {
        width: fit-content;
        display: flex;
        align-items: center;
        gap: 3px;
        background-color: var(--element-bg);
        border-width: var(--border-width);
        border-style: var(--border-style);
        outline-width: var(--outline-hidden);
        outline-style: var(--outline-style);
        border-radius: var(--radius);

        &:hover, &:focus-within {
          outline-width: var(--outline-width);
          outline-offset: var(--outline-offset);
        }

        & .section-container {
          padding: 3px;
          z-index: 1;

          /* Hide number arrows in Chrome, Safari, Edge, Opera */
          & input::-webkit-outer-spin-button,
          & input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          /* Hide number arrows in Firefox */
          & input[type=number] {
            -moz-appearance: textfield;
          }

          & input {
            text-align: center;
            outline: none;
            background-color: var(--element-bg);
          }
        }

        & .colon {
          display: flex;
          flex-direction: column;
          font-weight: bold;
        }
      }

      .ampm-btn {
        display: flex;
        flex-direction: column;
        padding: 3px 9px;
        text-align: center;
        background-color: var(--primary-bg);
        color: var(--white);
        border: var(--border-width) var(--border-style) var(--primary-bg);
        outline: var(--outline-hidden) var(--outline-style) var(--primary-bg);
        border-radius: var(--radius);

        &:hover, &:focus {
          outline-width: var(--outline-width);
          outline-offset: var(--outline-offset);
        }
      }      
    }

    .label-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 3rem;
    }

    .label-text {
      font-size: 0.6rem;
      line-height: 100%;
      margin-top: 2px;
      margin-bottom: -2px;
    }
  }
</style>
