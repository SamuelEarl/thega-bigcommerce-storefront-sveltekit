<script lang="ts">
  import {
    Grid, 
    Row, 
    Col,
    Link, 
    TabsContainer, 
    TabBar, 
    Tab, 
    TabPanel 
  } from "$lib/client/components";
</script>

# Grid (layout)

You can use these `<Grid>` components, which are based on Flexbox properties, to layout your pages and even apply responsive design techniques easily. However, if this `<Grid>` does not meet your needs, then you may want to consider creating your own grid components or utility classes.

---

## Why use a reusable grid component?

Why shoud you consider using reusable grid components instead of applying CSS styles (with Flexbox or Grid) to layout your pages? You can certainly use Flexbox or CSS grid styles to layout elements and components on a page and that will work nicely with small projects. However, when you are working on large projects that have multiple developers you will quickly run into a few important issues.

What should you do when you need to define a grid layout for a new page or a portion of a page? Initially you might create some layout styles somewhere and then copy and paste those layout styles in other places where you need a grid layout. Imagine trying to scale that approach with even a medium sized project. Often times developers end up creating utility classes that they can reuse so they don't have to copy and paste the same CSS grid styles multiple times. However, when using a component-based framework, like Svelte, a better option than using utility classes is using reusable grid components. Reusable grid components can help you prevent code duplication, which greatly simplifies code maintenance.

What about when you are working on a project with multiple developers? Now consistency and standardization become critical. It can be very difficult to standardize on a consistent method for laying out pages using CSS styles alone. Aside from all the duplicated CSS code that happens from copying and pasting CSS layout rules all over the place, some developers might prefer using Flexbox, while others might prefer CSS grid. Some might be old school and prefer using `float` properties. Even if all the developers on your team agree on a single method for laying out your pages, each developer could implement the layout a little differently. Things can get really messy really quickly. Reusable grid components can help you maintain consistent standards for your page layouts, which also helps with code maintenance. 

Remember that when working with CSS, one of the main goals is maintainability. So implement standards that make your code easier to maintain.

<br>

## Example Usage

There are three components: `<Grid>`, `<Row>`, `<Col>`. You can use responsive design concepts with the `<Col>` components to easily change the layout and even hide columns at different breakpoints.

<Grid gap={{r:20, c:20}}>
  <Row>
    <Col xs={12} md={6} xl={2}><div class="cell red">Cell</div></Col>
    <Col xs={0} md={0} xl={6}><div class="cell yellow">Cell (hidden on xs, sm, md, and lg breakpoints)</div></Col>
    <Col xs={12} md={6} xl={2}><div class="cell blue">Cell</div></Col>
    <Col xs={12} md={6} xl={2}><div class="cell green">Cell</div></Col>
  </Row>
  <Row>
    <Col xs={12} md={6} xl={2}><div class="cell red">Cell</div></Col>
    <Col xs={12} md={6} xl={3}><div class="cell yellow">Cell</div></Col>
    <Col xs={0} md={6} xl={5}><div class="cell blue">Cell (hidden on xs and sm breakpoints)</div></Col>
    <Col xs={12} md={6} xl={2}><div class="cell green">Cell</div></Col>
  </Row>
</Grid>

<br>

```svelte
<Grid gap={{r:20, c:20}}>
  <Row>
    <Col xs={12} md={6} xl={2}><div class="cell red">Cell</div></Col>
    <Col xs={0} md={0} xl={6}><div class="cell yellow">Cell (hidden on xs, sm, md, and lg breakpoints)</div></Col>
    <Col xs={12} md={6} xl={2}><div class="cell blue">Cell</div></Col>
    <Col xs={12} md={6} xl={2}><div class="cell green">Cell</div></Col>
  </Row>
  <Row>
    <Col xs={12} md={6} xl={2}><div class="cell red">Cell</div></Col>
    <Col xs={12} md={6} xl={3}><div class="cell yellow">Cell</div></Col>
    <Col xs={0} md={6} xl={5}><div class="cell blue">Cell (hidden on xs and sm breakpoints)</div></Col>
    <Col xs={12} md={6} xl={2}><div class="cell green">Cell</div></Col>
  </Row>
</Grid>
```

Since this `<Grid>` component uses a 12-column layout, that means that for each breakpoint any columns that exceed 12 will wrap to the next row. For example, each of the `xs` values equals `12`, so each `<Col>` will take up the entire row on `xs` screens. Each of the `md` values equals `6`, so each `<Col>` will take up half a row on `md` screens. You can probably do the math for how much space each `<Col>` will take up on `xl` screens and above. You can also resize your screen to see how the columns layout at each of those breakpoints.

Also note that you can hide columns at different breakpoints by passing `0` to the breakpoint. You can show the column again on larger breakpoints by passing a value between `1` and `12` to the larger breakpoint prop. See the explanation under the "Column Breakpoints" heading for more details.

<br>


## 12-column Layout
The Fanny Pack `<Grid>` component uses a 12-column layout. A 12-column layout is more versatile than a 16-column layout because it allows developers to implement page layouts that are evenly split into halves, thirds, quarters or more. 16-column layouts can't evenly split a page into thirds.

<br>

## Column Breakpoints

Fanny Pack UI uses 6 breakpoints:

* `xs`: 0px - 639px (Extra small devices - phones, 600px and smaller)
* `sm`: 640px - 767px (Small devices - portrait tablets and large phones, 601px and larger)
* `md`: 768px - 1023px (Medium devices - landscape tablets, 768px and larger)
* `lg`: 1024px - 1279px (Large devices - laptops, 993px and larger)
* `xl`: 1280px - 1535px (Extra large devices - large laptops and desktops, 1200px and larger)
* `xxl`: 1536px and larger

Just like with any other responsive design system, larger breakpoints will inherit the column values that you set on smaller breakpoints. So, for example, if you only set column values for the `xs` breakpoint, the `xxl` breakpoint will inherit those same column values.

6 breakpoints might seem like a lot to work with, but you don't have to set column values for each breakpoint. One idea you can use is to specify column values for only the `xs`, `md`, and `xl` breakpoints and then allow the other breakpoints to inherit the column values from the breakpoints that are smaller than them (e.g. `sm` will inherit from `xs`, `lg` will inherit from `md`, `xxl` will inherit from `xl`).

Note that the value ranges for each breakpoint can be changed in the `media-queries.css` file.

For reference, here are the viewport sizes of some common devices:

* iPhone 8: 375px wide x 667px high (portrait is `xs` range, landscape is `sm` range)
* iPad (in portrait mode): 768px wide x 1024px high (`md` range)
* iPad Pro (in portrait mode): 1024px wide x 1366px high (`lg` range)
* Macbook Pro 15": 1440px wide x 900px high (`xl` range)

<br>

## `equalColWidths` and `contain`

By default the column widths are auto-calculated based on the size of the content within them. However, you can pass the `equalColWidths` prop to the `<Grid>` component to make the columns equal widths.

If you pass the `contain` prop to a `<Grid>` component, then the `<Grid>` will be centered on the screen and the content within the `<Grid>` will not spread any wider across the screen than the `--width-lg` value from the `theme.css` file.

<Grid
  gap={{r:40, c:20}}
  equalColWidths
  contain
>
  <Row>
    <Col><div class="cell red">Cell</div></Col>
    <Col><div class="cell yellow">Cell</div></Col>
    <Col><div class="cell blue">Cell</div></Col>
    <Col>
      <div class="cell green">
        Cell<br>This demonstrates how the <code style="background-color: transparent">equalColWidths</code> prop affects the column widths: The columns will maintain equal width even when one column has more content than the others and  the text will wrap within the column.
      </div>
    </Col>
  </Row>
  <Row>
    <Col><div class="cell red">Cell</div></Col>
    <Col>
      <div class="cell yellow">
        Cell<br><br>This column has more text than the other columns
      </div>
    </Col>
    <Col><div class="cell blue">Cell</div></Col>
    <Col><div class="cell green">Cell</div></Col>
  </Row>
</Grid>

<br>

```svelte
<script lang="ts">
  import { Grid, Row, Col } from "$lib/client/components";
</script>

<Grid
  gap={{r:40, c:20}}
  equalColWidths
  contain
>
  <Row>
    <Col><div class="cell red">Cell</div></Col>
    <Col><div class="cell yellow">Cell</div></Col>
    <Col><div class="cell blue">Cell</div></Col>
    <Col>
      <div class="cell green">
        Cell<br>This demonstrates how the <code>equalColWidths</code> 
        prop affects the column widths: The columns will maintain equal 
        width even when one column has more content than the others and 
        the text will wrap within the column.
      </div>
    </Col>
  </Row>
  <Row>
    <Col><div class="cell red">Cell</div></Col>
    <Col>
      <div class="cell yellow">
        Cell<br><br>This column has more text than the other columns
      </div>
    </Col>
    <Col><div class="cell blue">Cell</div></Col>
    <Col><div class="cell green">Cell</div></Col>
  </Row>
</Grid>

<style>
  .cell {
    height: 100%;
    padding: 5px 10px;
    color: var(--white);

    &.red {
      background-color: var(--dark-red);
    }

    &.yellow {
      background-color: var(--yellow);
      color: var(--text-color);
    }

    &.blue {
      background-color: var(--dark-blue);
    }

    &.green {
      background-color: var(--dark-green);
    }
  }
</style>
```

<br>

## Offset columns

You can move columns up to 11 columns to the right by passing empty `<Col>` components along with breakpoint props that take up the amount of space you want to offset. Then you can simply pass `<Col>` components that have content.

<div class="grid-wrapper">
  <Grid gap={{r:5, c:5}}>
    <Row>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}><div class="cell blue">Cell</div></Col>
    </Row>
    <Row>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}><div class="cell blue">Cell</div></Col>
      <Col xs={2}><div class="cell blue">Cell</div></Col>
    </Row>
    <Row>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}><div class="cell blue">Cell</div></Col>
      <Col xs={2}><div class="cell blue">Cell</div></Col>
      <Col xs={2}><div class="cell blue">Cell</div></Col>
    </Row>
    <Row>
      <Col xs={3}><div class="cell blue">Cell</div></Col>
      <Col xs={3}><div class="cell blue">Cell</div></Col>
      <Col xs={3}><div class="cell blue">Cell</div></Col>
      <Col xs={3}><div class="cell blue">Cell</div></Col>
    </Row>
  </Grid>
</div>

<br>

```svelte
<div class="grid-wrapper">
  <Grid gap={{r:5, c:5}}>
    <Row>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}><div class="cell blue">Cell</div></Col>
    </Row>
    <Row>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}><div class="cell blue">Cell</div></Col>
      <Col xs={2}><div class="cell blue">Cell</div></Col>
    </Row>
    <Row>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}></Col>
      <Col xs={2}><div class="cell blue">Cell</div></Col>
      <Col xs={2}><div class="cell blue">Cell</div></Col>
      <Col xs={2}><div class="cell blue">Cell</div></Col>
    </Row>
    <Row>
      <Col xs={3}><div class="cell blue">Cell</div></Col>
      <Col xs={3}><div class="cell blue">Cell</div></Col>
      <Col xs={3}><div class="cell blue">Cell</div></Col>
      <Col xs={3}><div class="cell blue">Cell</div></Col>
    </Row>
  </Grid>
</div>
```

<br>

## Thoughts on CSS grid-based layout components

 CSS grid properties can be really helpful for complex layouts. However, trying to create reusable components based on CSS grid (e.g. `display: grid`) might not make a lot of sense because the CSS grid properties are already pretty easy to use. On the other hand, trying to create reusable components that are general and flexible enough to take multiple CSS grid properties as props can get a bit complicated. It might make more sense to create utility classes based on CSS grid, but reusable layout components could also work if those components can be created for specific layout needs.

<br>

## Props

<TabsContainer>
  <TabBar>
    <Tab>Grid</Tab>
    <Tab>Col</Tab>
  </TabBar>

  <TabPanel>
    <h2>Grid</h2>

    <!-- See the comment in the Tabs component props for an explanation of these empty divs. -->
    <div></div>

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `gap` | `{ r: number, c: number }` | Any number can be used for `r` and `c` | `{ r: 0, c: 0 }` | Similar to the `gap` property in CSS grids, this will provide space between the rows (`r`) and columns (`c`) of the grid. The number(s) that are passed to this prop represent the number of pixels between the rows and/or columns in the grid. |
    | `equalColWidths` | `boolean` | `true`, `false` | `false` | If you do not set any column breakpoint values, then the widths of each column will be auto-calculated based on the content in each column. However, if you want the column widths to be equal, then you can pass the `equalColWidths` prop to the `<Grid>` component. NOTE: The column breakpoint values will override the `equalColWidths` prop if both are set. |
    | `contain` | `boolean` | `true`, `false` | `false` | If you pass the `contain` prop to a `<Grid>` component, then the `<Grid>` will be centered on the screen and the content within the `<Grid>` will not spread any wider across the screen than the `--width-lg` value from the `theme.css` file. |
  </TabPanel>

  <TabPanel>
    <h2>Col</h2>

    <div></div>

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `xs`, `sm`, `md`, `lg`, `xl`, `xxl` | `number` | Any number | `undefined` | Each of these props represents a breakpoint. You can specify the width of each `<Col>` component for the `xs`, `sm`, `md`, `lg`, `xl`, and/or `xxl` breakpoints. Values can be from `1` to `12`.<br><br>This `<Grid>` component uses a 12-column layout. That means that for each breakpoint any columns that exceed 12 will wrap to the next row. See the "Responsive Grid" section above for an explanation and an example of how this works. |
  </TabPanel>
</TabsContainer>

<br>

## Additional Notes

* This Grid borrows ideas from <Link href="https://www.w3schools.com/w3css/w3css_grid.asp" target="_blank">W3Schools' responsive grid</Link> and the <Link href="https://carbon-components-svelte.onrender.com/components/Grid" target="_blank">Carbon Components Svelte Grid</Link>.
* This article was also used as inspiration for creating a grid component system in the first place: <Link href="https://codyhouse.co/blog/post/css-grid-layout-vs-framework-grid" target="_blank">Why CSS Grid Layout doesn't replace the framework's grid</Link>


<style>
  .grid-wrapper {
    border: var(--border);
  }

  .cell {
    height: 100%;
    padding: 5px 10px;
    color: var(--white);

    &.red {
      background-color: var(--dark-red);
    }

    &.yellow {
      background-color: var(--yellow);
      color: var(--text-color);
    }

    &.blue {
      background-color: var(--dark-blue);
    }

    &.green {
      background-color: var(--dark-green);
    }
  }
</style>
