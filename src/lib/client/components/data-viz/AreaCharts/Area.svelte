<script lang="ts">
  import { getContext } from "svelte";
  import { area, line, curveCatmullRom } from "d3";
  import { AREA_CHART_KEY } from "./area-chart-utils";

  interface Props {
    yValueId: any;
    color?: string;
  }

  let { yValueId, color = "#000000" }: Props = $props();

  let {
    svgWidth,
    svgHeight,
    hoveredValueXPos,
    data,
    xValueId,
    xScaleFunction,
    yScaleFunction,
  } = getContext(AREA_CHART_KEY);

  let xScale = $derived(xScaleFunction($svgWidth));
  let yScale = $derived(yScaleFunction($svgHeight));

  // The area generator.
	let areaGenerator = $derived(area()
		.x(d => xScale(d[xValueId]))
    .y0(() => yScale.range()[0])
		.y1(d => yScale(d[yValueId]))
    .curve(curveCatmullRom.alpha(0.5)));

  // The line generator.
	let lineGenerator = $derived(line()
		.x(d => xScale(d[xValueId]))
		.y(d => yScale(d[yValueId]))
    .curve(curveCatmullRom.alpha(0.5)));

  const uid = $props.id();
</script>

<defs>
  <linearGradient
    id={`area-gradient-${uid}`}
    x1="0%"
    y1="0%"
    x2="0%"
    y2="100%"
  >
    <stop offset="0%" stop-color={color} stop-opacity="0.7" />
    <stop offset="100%" stop-color={color} stop-opacity="0.05" />
  </linearGradient>
</defs>

<g>
  <path d={areaGenerator(data)} class="area" fill={`url(#area-gradient-${uid})`} />
  <path d={lineGenerator(data)} class="line" stroke={color} />    
  {#each data as datum, index}
    <!-- Set the cx and cy coordinates to be their scaled versions so they will be plotted inside the chart area. -->
    <circle
      cx={xScale(datum[xValueId])}
      cy={yScale(datum[yValueId])}
      r="5"
      id={`circle-${uid}`}
      stroke={color}
      fill={$hoveredValueXPos === xScale(datum[xValueId]) ? color : "white"}
      class="circle"
    />
  {/each}
</g>

<style>
  .line {
    fill-opacity: 0;
    stroke-width: 2;
  }

  .circle {
    stroke-width: 1;
  }
</style>
