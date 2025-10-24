<script lang="ts">
  import { getContext } from "svelte";
  import { AREA_CHART_KEY } from "./AreaCharts/area-chart-utils";
  
  interface Props {
    // Axis Line
    showAxisLine?: boolean;
    // Tick Marks
    showTickMarks?: boolean;
    fullLengthTickMarks?: boolean;
    numberOfTickMarks?: number;
    // Tick Labels
    showTickLabels?: boolean;
    // By default this will return the tick label without formatting it.
    formatTickLabel?: any;
    tickLabelTranslateX?: any;
    tickLabelTranslateY?: number;
    rotateTickLabel?: number;
    // Axis Labels
    axisLabelText?: string;
    axisLabelSize?: number;
    // Styles
    lineStrokeColor?: string;
    lineStrokeWidth?: number;
    tickLabelFontSize?: number;
    tickLabelFill?: string;
  }

  let {
    showAxisLine = true,
    showTickMarks = true,
    fullLengthTickMarks = false,
    numberOfTickMarks = 5,
    showTickLabels = true,
    formatTickLabel = (tick) => tick,
    tickLabelTranslateX = -15,
    tickLabelTranslateY = 0,
    rotateTickLabel = 0,
    axisLabelText = "",
    axisLabelSize = 16,
    lineStrokeColor = "#000000",
    lineStrokeWidth = 1,
    tickLabelFontSize = 12,
    tickLabelFill = "#000000"
  }: Props = $props();

  let {
    svgWidth,
    svgHeight,
    margin,
    yScaleFunction,
  } = getContext(AREA_CHART_KEY);

  let yScale = $derived(yScaleFunction($svgHeight));
</script>

{#if axisLabelText}
  <text
    class="axis-label"
    transform={`translate(${0}, ${$svgHeight / 2}) rotate(270)`}
    text-anchor="middle"
    dominant-baseline="hanging"
    font-size={axisLabelSize + "px"}
  >
    {axisLabelText}
  </text>
{/if}

<!-- y-axis -->
<!-- y-axis group -->
<!-- The `+ 5` in the `translate()` function below aligns the y-axis line with the left edge of the chart. -->
<g class="axis-group" transform="translate({margin.left + 5}, 0)">
  <!-- y-axis line -->
  {#if showAxisLine}
    <!-- The y-axis line has 5px added to the top and to the bottom. The 5px on the bottom will ensure that the bottom of the y-axis lines up with the x-axis tick marks. The 5px on the top will ensure that the top of the y-axis extends beyond the top tick mark by at least 5px so it looks consistent with the bottom of the y-axis. -->
    <line
      y1={margin.top - 5}
      y2={$svgHeight - margin.bottom + 5}
      class="axis-line"
      stroke={lineStrokeColor}
      stroke-width={lineStrokeWidth}
    />
  {/if}

  <!-- tick marks -->
  {#each yScale.ticks(numberOfTickMarks) as tick} 
    <g class="tick-group" transform="translate(0,{yScale(tick)})">
      {#if showTickMarks}
        <!-- y-axis tick marks start a -5px behind the y-axis line. If this axis has fullLengthTickMarks, then each tick mark will end at the right edge of the chart. Otherwise each tick mark will end where the y-axis line would be (i.e. at x2="0") and each tick mark would be 5px wide. -->
        <line 
          x1="-10" 
          x2={fullLengthTickMarks ? $svgWidth : 0}
          class="tick-mark" 
          stroke={lineStrokeColor} 
          stroke-width={lineStrokeWidth} 
        />
      {/if}
      {#if showTickLabels}
        <text 
          class="tick-label" 
          text-anchor="end" 
          dominant-baseline="middle"
          transform={`translate(${tickLabelTranslateX}, ${tickLabelTranslateY}) rotate(${rotateTickLabel})`}
          font-size={tickLabelFontSize}
          fill={tickLabelFill}
        >
          {formatTickLabel(tick)}
        </text>
      {/if}
    </g>
  {/each}
</g>

<style>
  .axis-line {
    shape-rendering: crispEdges;
  }

  .tick-mark {
    shape-rendering: crispEdges;
  }

  .tick-label {
    shape-rendering: crispEdges;
  }
</style>
