<script lang="ts">
  import { getContext } from "svelte";
  import { AREA_CHART_KEY } from "./AreaCharts/area-chart-utils";
  
  interface Props {
    // Axis Line
    showAxisLine?: boolean;
    lineStrokeColor?: string;
    lineStrokeWidth?: number;
    // Tick Marks
    showTickMarks?: boolean;
    fullLengthTickMarks?: boolean;
    numberOfTickMarks?: number;
    // Tick Labels
    showTickLabels?: boolean;
    tickLabelFontSize?: number;
    tickLabelFill?: string;
    // By default this will return the tick label without formatting it.
    formatTickLabel?: any;
    tickLabelTranslateX?: number;
    tickLabelTranslateY?: number;
    rotateTickLabel?: number;
    // Axis Label
    axisLabelText?: string;
    axisLabelSize?: number;
  }

  let {
    showAxisLine = true,
    lineStrokeColor = "#000000",
    lineStrokeWidth = 1,
    showTickMarks = true,
    fullLengthTickMarks = false,
    numberOfTickMarks = 5,
    showTickLabels = true,
    tickLabelFontSize = 12,
    tickLabelFill = "#000000",
    formatTickLabel = (tick) => tick,
    tickLabelTranslateX = 0,
    tickLabelTranslateY = 15,
    rotateTickLabel = 0,
    axisLabelText = "",
    axisLabelSize = 16
  }: Props = $props();

  let {
    svgWidth,
    svgHeight,
    margin,
    xScaleFunction,
  } = getContext(AREA_CHART_KEY);

  let xScale = $derived(xScaleFunction($svgWidth));
</script>

{#if axisLabelText}
  <text
    class="axis-label"
    x={$svgWidth / 2}
    y={$svgHeight}
    text-anchor="middle"
    dominant-baseline="bottom"
    font-size={axisLabelSize + "px"}
  >
    {axisLabelText}
  </text>
{/if}

<!-- x-axis -->
<!-- x-axis group -->
<!-- The `- 5` in the `translate()` function below aligns the x-axis line with the bottom edge of the chart. -->
<g class="axis-group" transform="translate(0, {$svgHeight - margin.bottom - 5})">
  <!-- x-axis line -->
  {#if showAxisLine}
    <!-- The x-axis starting point is 5px behind the y-axis. -->
    <line
      x1={margin.left - 5}
      x2={$svgWidth - margin.right}
      class="axis-line"
      stroke={lineStrokeColor}
      stroke-width={lineStrokeWidth}
    />
  {/if}
  
  <!-- tick marks -->
  {#each xScale.ticks(numberOfTickMarks) as tick}
    <g class="tick-group" transform={`translate(${xScale(tick)})`}>
      {#if showTickMarks}
        <!-- x-axis tick marks start a 5px below the x-axis line. If this axis has fullLengthTickMarks, then each tick mark will end at the top edge of the chart (plus 5px toward the top to match the y-axis length - see the comment above the y-axis line). Otherwise each tick mark will end where the x-axis line would be (i.e. at x2="0") and each tick mark would be 5px tall. -->
        <line
          y1="10" 
          y2={fullLengthTickMarks ? (-($svgHeight - margin.top - margin.bottom + 5)) : 0}
          class="tick-mark" 
          stroke={lineStrokeColor} 
          stroke-width={lineStrokeWidth} 
        />
      {/if}
      {#if showTickLabels}
        <text
          class="tick-label"
          text-anchor="middle"
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
