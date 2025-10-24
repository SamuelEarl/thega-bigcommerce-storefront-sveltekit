<script lang="ts">
  import { setContext, tick, onDestroy } from "svelte";
  import type { Snippet } from "svelte";
  import { writable } from "svelte/store";
  import { scaleTime, scaleLinear, bisectCenter, min, max } from "d3";
  // TODO (bug fix): This lodash function might be causing loading errors for the entire app. Ugh!!!!!
  // UPDATE: There is a note above the `removeHighlights()` function explaining the fix for this, but I may want to look at this again.
  import { throttle } from "lodash-es";
  import type { Margin } from "../types-charts";
  import { AREA_CHART_KEY } from "./area-chart-utils";
  
  interface Props {
    data?: any;
    xValueId: string;
    margin?: Margin;
    chartTitleSize?: number;
    chartTitleText?: string;
    showTooltip?: boolean;
    // By default this will return the value without formatting it.
    formatTooltipXValueFunc?: (event: CustomEvent) => void;
    onDataPointHoverCallback?: (event: CustomEvent) => void;
    children?: Snippet;
  }

  let {
    data = [],
    xValueId,
    margin = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    chartTitleSize = 16,
    chartTitleText = "",
    showTooltip = false,
    formatTooltipXValueFunc = (value) => value,
    onDataPointHoverCallback,
    children
  }: Props = $props();

  const uid = $props.id();
  let highlightTimerID = null;

  let xValuesArray = data.map(datum => datum[xValueId]);

  let yValues = [];
  for (let i = 0; i < data.length; i++) {
    for (let prop in data[i]) {
      if (prop !== xValueId) {
        yValues.push(data[i][prop]);
      }
    }
  };
  let yScaleMin = Math.min(...yValues);
  // TODO: Test scenarios where the yScaleMin is negative. How does that look on the chart? Will that work accurately?
  yScaleMin = yScaleMin < 0 ? yScaleMin : 0;
  let yScaleMax = Math.max(...yValues);

  // These are reactive contexts, so you can subscribe to them with the $ symbol.
  let svgWidth = writable<number>(600);
  let svgHeight = writable<number>(300);
  let hoveredValueXPos = writable<number>(-1000000);

  const spaceBetweenTooltipAndDataPoint = 12;
  let tooltipXPos = $derived($hoveredValueXPos + spaceBetweenTooltipAndDataPoint);
  let tooltipYPos = $state(0);

  let tooltipBounds = null;
  let chartContainerBounds = null;

  let xAccessor = $derived((d) => d[xValueId]);

  onDestroy(() => {
    clearTimeout(highlightTimerID);
  });

  function xScaleFunction(svgWidth) {
    return scaleTime()
      .domain([min(data, xAccessor), max(data, xAccessor)])
      // The range will provide a 5px buffer on the left and right sides so the points don't get cutoff.
      .range([margin.left + 5, svgWidth - margin.right - 5]);
  }

  let xScale = $derived(xScaleFunction($svgWidth));

  // $: yAccessor = (d) => d[yValueId];

  function yScaleFunction(svgHeight) {
    return scaleLinear()
      // .domain([0, max(data, yAccessor)])
      // TODO: Test this idea: It might be necessary to keep the axes static, even if the data points fluctuate, rather than use a yAccessor function like I did in the xScaleFunction. If this were a realtime chart, then I would probably have to use a dynamically generated yScale with a yAccessor function.
      .domain([yScaleMin, yScaleMax])
      // The range will provide a 5px buffer on the bottom and top sides so the points don't get cutoff.
      .range([svgHeight - margin.bottom - 5, margin.top + 5]);
  }

  let dataPointIndex = $state();

  async function handleMouseMove(event) {
    // This conditional check prevents the highlighted points and the tooltip from bouncing around in Firefox.
    if (event.offsetX === 0 || event.offsetY === 0) return;

    // Set the mouse's x and y positions.
    let mouseXPos = event.offsetX;
    let mouseYPos = event.offsetY;
    // console.log("mouseXPos:", event.offsetX);
    // console.log("mouseYPos:", event.offsetY);

    // Return the point that is closest to the mouse position's current clientX position.
    dataPointIndex = bisectCenter(xValuesArray, xScale.invert(mouseXPos));
    // console.log("dataPointIndex:", dataPointIndex);

    // Set the highlighted x-values and the x-position of the tooltip.
    if (dataPointIndex < xValuesArray.length) {
      $hoveredValueXPos = xScale(xValuesArray[dataPointIndex]);
      // If a function has been passed to the `onDataPointHoverCallback()` prop, then call that function, which will return the data object that is being hovered over.
      if (onDataPointHoverCallback) {
        onDataPointHoverCallback(data[dataPointIndex]);
      }
    }

    if (showTooltip) {
      // Wait until the tooltip is in the DOM before referencing it.
      // Calling the tick() method outside of the following `if` statement will also prevent the tooltip from skipping around when the user moves their mouse outside of the chart area to the right.
      await tick();

      // Get the tooltip element.
      if (!tooltipBounds) {
        const tooltipElement = document.getElementById(`chart-tooltip-${uid}`);
        tooltipBounds = tooltipElement?.getBoundingClientRect();
        // console.log("tooltipBounds:", tooltipBounds);
      }

      // Get the chart container element.
      if (!chartContainerBounds) {
        chartContainerBounds = event.target.closest(".chart-container").getBoundingClientRect();
        // console.log("CHART CONTAINER BOUNDS:", chartContainerBounds);
      }

      // If the user hovers over a data point that falls in the first half of the chart, then the tooltip will be positioned to the right of the data point. If the user hovers over a data point that falls in the second half of the chart, then the tooltip will be positioned to the left of the data point.
      const tooltipArrow = document.getElementById(`chart-tooltip-arrow-${uid}`);
      const list = tooltipArrow?.classList;
      if (dataPointIndex > xValuesArray.length / 2) {
        tooltipXPos = $hoveredValueXPos - tooltipBounds.width - spaceBetweenTooltipAndDataPoint;
        // Remove and add the necessary arrow classes.
        list?.remove("arrow-left");
        list?.add("arrow-right");
      }
      else {
        list?.remove("arrow-right");
        list?.add("arrow-left");
      }

      // Set the tooltip's y position. The bottom of the tooltip will sit 10px above the location of the user's mouse location.
      tooltipYPos = mouseYPos - tooltipBounds.height - 10;
    }
  }

  /**
   * This function fixes the bug related to using throttle in the on:mouseover event. 
   * Before implementing this function: When I removed the throttle function, then the 
   * tooltip and the highlighting line will disappear when I hover outside of the chart 
   * area. But when the throttle function is present then those things may or may not 
   * disappear. I think that is because the timer that is attached to the throttle 
   * function allows it to run one last time, which means that it will run after the 
   * on:mouseleave event has run and the tooltip and the highlight line will be placed 
   * in the visible DOM again. 
   */
  // TODO: Is there a way to resolve this issue without a setTimeout?
  function removeHighlights() {
    highlightTimerID = setTimeout(() => {
      tooltipXPos = -1000000;
      // If the tooltip is displayed, then remove the highlighted data point when the user 
      // moves their mouse out of the chart area. This also means that when the tooltip is 
      // not displayed then the highlighted data point will remain highlighted when the 
      // user moves their mouse out of the chart area.
      if (showTooltip) {
        $hoveredValueXPos = -1000000;
      }
    }, 250);
  }

  setContext(AREA_CHART_KEY, {
    "svgWidth": svgWidth,
    "svgHeight": svgHeight,
    "hoveredValueXPos": hoveredValueXPos,
    "data": data,
    "xValueId": xValueId,
    "xValuesArray": xValuesArray,
    "margin": margin,
    "xScaleFunction": xScaleFunction,
    "yScaleFunction": yScaleFunction,
  });
</script>

<div
  class="chart-container"
  bind:clientWidth={$svgWidth}
  bind:clientHeight={$svgHeight}
  onmousemove={throttle(handleMouseMove, 200)}
  onmouseleave={removeHighlights}
>
  {#if showTooltip && $hoveredValueXPos > 0}
    <div
      class="chart-tooltip-container"
      style={`transform: translate(${tooltipXPos}px, ${tooltipYPos}px)`}
    >
      <div
        id={`chart-tooltip-${uid}`}
        class="chart-tooltip"
      >
        {#each Object.entries(data[dataPointIndex]) as [prop, value]}
          {#if prop === xValueId}
            <div>{prop}: {formatTooltipXValueFunc(value)}</div>
          {:else}
            <div>{prop}: {value}</div>
          {/if}
        {/each}
      </div>
      <div
        id={`chart-tooltip-arrow-${uid}`}
        class="chart-tooltip-arrow"
      ></div>
    </div>
  {/if}
  <svg>
    {#if showTooltip}
      <g class="vertical-hover-line" transform="translate(0, 0)">
        <line
          x1={$hoveredValueXPos}
          y1={margin.top}
          x2={$hoveredValueXPos}
          y2={$svgHeight - margin.bottom}
        />
      </g>
    {/if}

    {#if chartTitleText}
      <text
        class="chart-title"
        x={$svgWidth / 2}
        y={0}
        text-anchor="middle"
        dominant-baseline="hanging"
        font-size={chartTitleSize + "px"}
      >
        {chartTitleText}
      </text>
    {/if}

    {@render children?.()}
  </svg>
</div>

<style>
  .chart-container {
    position: relative;
    width: 100%;
    height: 100%;

    & .chart-tooltip-container {
      position: absolute;
      top: 0px;
      left: 0px;
      transition: 200ms linear 0s;
      z-index: 100;
      pointer-events: none;

      & .chart-tooltip {
        background-color: var(--neutral-11);
        border: 1px solid var(--neutral-5);
        border-radius: var(--radius);
        color: var(--white);
        padding: 0.4rem 0.6rem;
        filter: drop-shadow(3px 3px 6px rgb(0 0 0 / 0.4));
      }

      & .chart-tooltip-arrow {
        --arrow-size: 0.5rem;
        position: absolute;
        top: calc(50% - var(--arrow-size));
        border: var(--arrow-size) solid transparent;
        z-index: 101;

        &:global(.arrow-left) {
          left: calc((-2 * var(--arrow-size)) + 2px);
          border-right-color: var(--neutral-11);
        }

        &:global(.arrow-right) {
          right: calc((-2 * var(--arrow-size)) + 2px);
          border-left-color: var(--neutral-11);
        }
      }
    }

    & svg {
      width: 100%;
      height: 100%;

      & .vertical-hover-line line {
        stroke: var(--neutral-4);
        stroke-dasharray: 4 4;
      }
    }
  }
</style>
