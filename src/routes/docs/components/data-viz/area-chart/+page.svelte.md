<script lang="ts">
  import { AreaChart, Area, Axis } from "$lib/client/components";

  const simpleData = [
    { timestamp: new Date("2025-01-20T12:25:00.000Z"), pv: 2400 },
    { timestamp: new Date("2025-01-20T12:25:01.000Z"), pv: 1398 },
    { timestamp: new Date("2025-01-20T12:25:02.000Z"), pv: 9800 },
    { timestamp: new Date("2025-01-20T12:25:03.000Z"), pv: 3908 },
    { timestamp: new Date("2025-01-20T12:25:04.000Z"), pv: 4800 },
    { timestamp: new Date("2025-01-20T12:25:05.000Z"), pv: 3800 },
    { timestamp: new Date("2025-01-20T12:25:06.000Z"), pv: 4300 },
  ];

  const complexData = [
    {
      timestamp: new Date("2025-01-20T12:25:00.000Z"),
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      timestamp: new Date("2025-01-20T12:25:01.000Z"),
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      timestamp: new Date("2025-01-20T12:25:02.000Z"),
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      timestamp: new Date("2025-01-20T12:25:03.000Z"),
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      timestamp: new Date("2025-01-20T12:25:04.000Z"),
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      timestamp: new Date("2025-01-20T12:25:05.000Z"),
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      timestamp: new Date("2025-01-20T12:25:06.000Z"),
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  /**
   * This will return the value padded with leading zeros,
   * when necessary, so each value has 2 digits.
   */
  function padWithZeros(num) {
    return String(num).padStart(2, "0");
  }

  /**
   * In this chart example each x-axis tick (i.e. each data point's x-value)
   * is a JavaScript Date object. So I am simply calling Date.getHours(), 
   * Date.getMinutes(), and Date.getSeconds() on each x-axis tick and 
   * returning the formatted time.
   */
  function getTime(tick) {
    let hours = padWithZeros(tick.getHours());
    let minutes = padWithZeros(tick.getMinutes());
    let seconds = padWithZeros(tick.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  let currentData = $state({ timestamp: null, pv: null });
</script>


# Area Chart

---

## Example Usage

## Basic

You can use a tooltip to display the values of a data point (see examples below), but it might be better to get the data objects from the data points (when a user hovers over a data point) and format the data objects however you want before displaying those data objects to the user. You can pass a function to the `<AreaChart>` component's `onDataPointHoverCallback` callback prop and get the data from that function.

<br>

<div class="current-data">
  <span class="time">Time: {currentData.timestamp ? getTime(currentData.timestamp) : null}</span>
  <span class="value">Value: {currentData.pv}</span>
</div>

<div class="chart-space">
  <AreaChart
    data={simpleData}
    xValueId="timestamp"
    margin={{
      top: 50,
      bottom: 75,
      left: 70,
      right: 5,
    }}
    chartTitleText="Chart Title"
    chartTitleSize=30
    onDataPointHoverCallback={(dataObj) => currentData = dataObj}
  >
    <Axis
      axisType="xAxis"
      formatTickLabel={getTime}
      tickLabelTranslateX={-15}
      tickLabelTranslateY={25}
      rotateTickLabel={-45}
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="X-Axis Label"
      axisLabelSize={20}
    />
    <Axis
      axisType="yAxis"
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="Y-Axis Label"
      axisLabelSize={20}
    />
    <Area
      yValueId="pv"
      color={"var(--primary-bg)"}
    />
  </AreaChart>
</div>

<br><br>

```svelte
<script lang="ts">
  import { AreaChart, Area, Axis } from "$lib/client/components";

  const simpleData = [
    { timestamp: new Date("2025-01-20T12:25:00.000Z"), pv: 2400 },
    { timestamp: new Date("2025-01-20T12:25:01.000Z"), pv: 1398 },
    { timestamp: new Date("2025-01-20T12:25:02.000Z"), pv: 9800 },
    { timestamp: new Date("2025-01-20T12:25:03.000Z"), pv: 3908 },
    { timestamp: new Date("2025-01-20T12:25:04.000Z"), pv: 4800 },
    { timestamp: new Date("2025-01-20T12:25:05.000Z"), pv: 3800 },
    { timestamp: new Date("2025-01-20T12:25:06.000Z"), pv: 4300 },
  ];

  /**
   * This will return the value padded with leading zeros,
   * when necessary, so each value has 2 digits.
   */
  function padWithZeros(num) {
    return String(num).padStart(2, "0");
  }

  /**
   * In this chart example each x-axis tick (i.e. each data point's x-value)
   * is a JavaScript Date object. So I am simply calling Date.getHours(), 
   * Date.getMinutes(), and Date.getSeconds() on each x-axis tick and 
   * returning the formatted time.
   */
  function getTime(tick) {
    let hours = padWithZeros(tick.getHours());
    let minutes = padWithZeros(tick.getMinutes());
    let seconds = padWithZeros(tick.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  }

  let currentData = $state({ timestamp: null, pv: null });
</script>

<div class="current-data">
  <span class="time">Time: {currentData.timestamp ? getTime(currentData.timestamp) : null}</span>
  <span class="value">Value: {currentData.pv}</span>
</div>

<div class="chart-space">
  <AreaChart
    data={simpleData}
    xValueId="timestamp"
    margin={{
      top: 50,
      bottom: 75,
      left: 70,
      right: 5,
    }}
    chartTitleText="Chart Title"
    chartTitleSize=30
    onDataPointHoverCallback={(dataObj) => currentData = dataObj}
  >
    <Axis
      axisType="xAxis"
      formatTickLabel={getTime}
      tickLabelTranslateX={-15}
      tickLabelTranslateY={25}
      rotateTickLabel={-45}
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="X-Axis Label"
      axisLabelSize={20}
    />
    <Axis
      axisType="yAxis"
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="Y-Axis Label"
      axisLabelSize={20}
    />
    <Area
      yValueId="pv"
      color={"var(--primary-bg)"}
    />
  </AreaChart>
</div>

<style>
  .chart-space {
    width: 100%;
    height: 400px;
  }
</style>
```

---

## Display data values with a tooltip

To display the data that the user hovers over in a tooltip you can pass the `showTooltip` prop to the `<AreaChart>` component and leave the `onDataPointHoverCallback` callback prop out of the `<AreaChart>` component.

<div class="chart-space">
  <AreaChart
    data={simpleData}
    xValueId="timestamp"
    margin={{
      top: 50,
      bottom: 75,
      left: 70,
      right: 5,
    }}
    chartTitleText="Chart Title"
    chartTitleSize=30
    formatTooltipXValueFunc={getTime}
    showTooltip
  >
    <Axis
      axisType="xAxis"
      formatTickLabel={getTime}
      tickLabelTranslateX={-15}
      tickLabelTranslateY={25}
      rotateTickLabel={-45}
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="X-Axis Label"
      axisLabelSize={20}
    />
    <Axis
      axisType="yAxis"
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="Y-Axis Label"
      axisLabelSize={20}
    />
    <Area
      yValueId="pv"
      color={"var(--primary-bg)"}
    />
  </AreaChart>
</div>

<br><br>

```svelte
<div class="chart-space">
  <AreaChart
    data={simpleData}
    xValueId="timestamp"
    margin={{
      top: 50,
      bottom: 75,
      left: 70,
      right: 5,
    }}
    chartTitleText="Chart Title"
    chartTitleSize=30
    formatTooltipXValueFunc={getTime}
    showTooltip
  >
    <Axis
      axisType="xAxis"
      formatTickLabel={getTime}
      tickLabelTranslateX={-15}
      tickLabelTranslateY={35}
      rotateTickLabel={-45}
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="X-Axis Label"
      axisLabelSize={20}
    />
    <Axis
      axisType="yAxis"
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="Y-Axis Label"
      axisLabelSize={20}
    />
    <Area
      yValueId="pv"
      color={"var(--primary-bg)"}
    />
  </AreaChart>
</div>
```

---

## Multiple Overlaid Areas

**TODO: This will probably be better as a line chart instead of an area chart because the colors of the area chart get hidden by each other.**

You can overlay multiple areas on top of each other. Keep in mind that some of the data points might not display very clearly and your chart might not look very good. You might consider using line charts for this use case instead of area charts.

<div class="chart-space">
  <AreaChart
    data={complexData}
    xValueId="timestamp"
    margin={{
      top: 50,
      bottom: 75,
      left: 70,
      right: 5,
    }}
    chartTitleText="Chart Title"
    chartTitleSize=30
    formatTooltipXValueFunc={getTime}
    showTooltip
  >
    <Axis
      axisType="xAxis"
      formatTickLabel={getTime}
      tickLabelTranslateX={-12}
      tickLabelTranslateY={35}
      rotateTickLabel={-45}
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="X-Axis Label"
      axisLabelSize={20}
    />
    <Axis
      axisType="yAxis"
      showAxisLine={false}
      showTickMarks={false}
      axisLabelText="Y-Axis Label"
      axisLabelSize={20}
    />
    <Area yValueId="uv" color="darkred" />
    <Area yValueId="pv" color="greenyellow" />
    <Area yValueId="amt" color="darkblue" />
  </AreaChart>
</div>

<br><br>

```svelte
<script>
  const complexData = [
    {
      timestamp: new Date("2025-01-20T12:25:00.000Z"),
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      timestamp: new Date("2025-01-20T12:25:01.000Z"),
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      timestamp: new Date("2025-01-20T12:25:02.000Z"),
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      timestamp: new Date("2025-01-20T12:25:03.000Z"),
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      timestamp: new Date("2025-01-20T12:25:04.000Z"),
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      timestamp: new Date("2025-01-20T12:25:05.000Z"),
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      timestamp: new Date("2025-01-20T12:25:06.000Z"),
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
</script>

<div class="chart-space">
  <AreaChart
    data={complexData}
    xValueId="timestamp"
    margin={{
      top: 50,
      bottom: 75,
      left: 70,
      right: 5,
    }}
    chartTitleText="Chart Title"
    chartTitleSize=30
    formatTooltipXValueFunc={getTime}
    showTooltip
  >
    ...
    <Area yValueId="uv" color="darkred" />
    <Area yValueId="pv" color="greenyellow" />
    <Area yValueId="amt" color="darkblue" />
  </AreaChart>
</div>
```

<br>

---

## Props

### For the `<AreaChart>` component
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `data` | `array` of `objects` | Any array of objects containing numerical values | NA | This prop will provide the data that is displayed in your chart. |
| `xValueId` | `string` | Any property name from your data objects | NA | This prop should be the name of a property from your data objects. This is how the `<AreaChart>` component is able to tell which values should be treated as the x-values. |
| `margin` | `object` | possible values | `{ top: 0, bottom: 0, left: 0, right: 0 }` | The `margin` prop is used to provide space between the edges of the chart and the container element that wraps your chart component. The margins include the axes and their tick labels, but do not include the chart title or axis labels. For example, if you increase the left chart margin, then the left edge of the chart along with the y-axis and its tick labels will move away from the left side of the screen, but the y-axis label will not move. |
| `chartTitleText` | `string` | Any string | `""` (an empty string) | This prop provides the chart title text. If no text is provided in this prop, then the chart will not have a title. |
| `chartTitleSize` | `number` | Any number | `16` (pixels) | This prop provides the size of the chart title in pixels. |
| `showTooltip` | `boolean` | `true`, `false` | `false` | This prop allows you to show or hide the tooltip when a user hovers over the chart. If the tooltip is hidden, then the vertical indicator line that appears along with the tooltip will also be hidden. |
| `formatTooltipXValueFunc` | `function` | Any function | `(value) => value`<br>By default this will return the value without formatting it. | You should provide a function to this prop that will take an x-value as an argument and return a formatted version of the x-value.<br><br>NOTE: This is not a callback prop. This function only formats values; it will not return any values to the parent component. |

<hr>
<br>

### For the `<Area>` component
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `yValueId` | `string` | Any property name from your data objects | NA | This prop should be the name of a property from your data objects. This is how the `<AreaChart>` component is able to tell which value(s) should be treated as a y-value. |
| `color` | `string` | Any CSS color value | `"#000000"` | This prop provides the color for your area chart. |

<hr>
<br>

### For the `<Axis>` component
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `axisType` | `string` | `"xAxis"`, `"yAxis"` | `""` (an empty string) | This prop defines whether the axis will be an x-axis (positioned below the chart) or a y-axis (positioned on the left side of the chart). |
| <div class="divider-row">Axis Line</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> |
| `showAxisLine` | `boolean` | `true`, `false` | `true` | This prop allows you to show or hide the axis line. |
| `lineStrokeColor` | `string` | Any CSS color value | `"#000000"` | This prop provides the color of the axis lines and axis tick marks. |
| `lineStrokeWidth` | `number` | Any number | `1` | This prop provides the stroke width for the axis lines and axis tick marks. |
| <div class="divider-row">Tick Marks</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> |
| `showTickMarks` | `boolean` | `true`, `false` | `true` | This prop allows you to show or hide the tick marks. |
| `fullLengthTickMarks` | `boolean` | `true`, `false` | `false` | If `showTickMarks` is `true`, then this prop allows you to set the tick marks to be the full height of the chart. |
| `numberOfTickMarks` | `number` | Any number | `5` | D3.js will take this number into consideration when setting the number of tick marks, but ultimately D3 will set the number of tick marks that it calculates to be the most appropriate number based on your data. |
| <div class="divider-row">Tick Labels</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> |
| `showTickLabels` | `boolean` | `true`, `false` | `true` | This prop allows you to show or hide the tick labels. |
| `tickLabelFontSize` | `number` | Any number | `12` | This prop sets the font size of the tick labels. |
| `tickLabelFill` | `string` | Any CSS color value | `"#000000"` | This prop sets the text color of the tick labels. |
| `formatTickLabel` | `function` | Any function | `(tick) => tick`<br>By default this will return the tick label without formatting it. | You should provide a function to this prop that will take a tick label as an argument and return a formatted version of the tick label. |
| `tickLabelTranslateX` | `number` | Any number | `"xAxis"`=`0`, `"yAxis"`=`-15` | This prop allows you to shift the tick labels either left or right. |
| `tickLabelTranslateY` | `number` | Any number | `"xAxis"`=`15`, `"yAxis"`=`0` | This prop allows you to shift the tick labels either up or down. |
| `rotateTickLabel` | `number` | Any number | `0` | This prop allows you to rotate the tick labels. |
| <div class="divider-row">Axis Labels</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> | <div class="divider-row">&nbsp;</div> |
| `axisLabelText` | `string` | Any string | `""` (an empty string) | This prop provides the axis label text. If no text is provided in this prop, then the axis will not have a label. |
| `axisLabelSize` | `number` | Any number | `16` (pixels) | This prop provides the size of the axis label in pixels. |

<hr>
<br>

## Callback props for the `<AreaChart>` component

| Prop | Description |
| ---- | ----------- |
| `onDataPointHoverCallback` | You can pass the `onDataPointHoverCallback` prop and get the currently hovered data object in response (see the example above for details). You might want to use this instead of displaying data through the tooltip. |


<style>
  .chart-space {
    width: 100%;
    height: 400px;
  }

  .current-data {
    display: inline-block;
    border: var(--border);
    font-family: var(--monospace);
    font-weight: bold;

    & .time, & .value {
      display: inline-block;
      padding: 10px 20px;
    }

    & .time {
      border-right: var(--border);
    }
  }

  .divider-row {
    margin: -10px -25px;
    padding: 3px 25px;
    font-size: 14px;
    font-style: italic;
    background-color: var(--element-bg);
  }
</style>
