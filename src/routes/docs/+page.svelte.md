<script lang="ts">
  import { Link, Table } from "$lib/client/components";
</script>

# Docs Home

One of the features of this component library is that it uses outlines extensively to display hover and focus states as well as substantial color contrasts. Both of these design ideas help to improve a11y. For those who are colorblind or are visually impaired, the color transitions and color contrasts that are used in many UI libraries are difficult to see. This component library uses outlines instead of color transitions for hover and focus states and stark color constrasts as much as possible.

In addition, the colors and fonts are fully customizable to create a custom theme relatively easily.

---

<div>
  <ul>
    <li><Link href="/docs/components/ui">UI Components</Link></li>
    <li><Link href="/docs/components/data-viz">Data Viz Components</Link></li>
    <li><Link href="/docs/utility-classes">Utility Classes</Link></li>
  </ul>
</div>

---

## General Component Props

<h3 id="colors">colors</h3>

The components all use default colors for background color, foreground color, border color, and outline color, which can all be changed in the `theme.css` file and/or the <code>defaults.ts</code> file. Many of the components also have a `colors` prop that can be used for customizing the colors of the component.

Note that this design system uses background (`bg`), foreground (`fg`), border (`br`), and outline (`ol`) colors extensively for default colors and for custom colors. For most components the background propery is used for the background color, the foreground property is used for the text and icon colors, the border color is used to display clearly defined borders, and the outline color is used to show an outline on hover and focus states, which helps with a11y and keyboard navigation.

<Table
  header={[
    [
      "Prop name",
      "Type", 
      "Possible values",
      "Default value", 
      "Description",
    ],
  ]}
  body={[
    [
      "<code>colors</code>",
      `<pre>{
  bg: string, 
  fg: string, 
  br: string, 
  ol: string,
}</pre>`,
      "Each property (<code>bg</code>, <code>fg</code>, <code>br</code>, <code>ol</code>) can take any CSS color value",
      `<p><strong>For components other than <code>&lt;Button&gt;</code> and <code>&lt;Link btnStyles&gt;</code> components:</strong></p>
      <p>These are the default values:</p>
<pre>{
  bg: "var(--element-bg)", 
  fg: "var(--element-fg)", 
  br: "var(--element-br)", 
  ol: "var(--element-ol)",
}</pre>
      <p>These default values are set in the <code>getElementColors()</code> function in the <code>default.ts</code> file. These default values can be changed by changing the corresponding CSS variables in the <code>theme.css</code> file.</p>
      <p><strong>For <code>&lt;Button&gt;</code> and <code>&lt;Link btnStyles&gt;</code> components:</strong></p>
      <p>The default values are the <code>primary</code> variant colors (i.e. <code>var(--primary-bg)</code>, <code>var(--primary-fg)</code>) and can be changed in the <code>theme.css</code> file. (See the docs for the <code>&lt;Button&gt;</code> and <code>&lt;Link btnStyles&gt;</code> components for more details.)</p>`,
      `The <code>colors</code> prop allows you to create components with custom colors. You can change the colors by specifying the component's...
      <ul>
        <li>background color (<code>bg</code>)</li>
        <li>foreground color (<code>fg</code>)</li>
        <li>border color (<code>br</code>)</li>
        <li>outline color (<code>ol</code>)</li>
      </ul>
      <p><strong>For components other than <code>&lt;Button&gt;</code> and <code>&lt;Link btnStyles&gt;</code> components:</strong></p>
      <p>Each property (<code>bg</code>, <code>fg</code>, <code>br</code>, <code>ol</code>) is optional, so you can specify only the colors you want to change and the other colors will use default values.</p>
      <p><strong>For <code>&lt;Button&gt;</code> and <code>&lt;Link btnStyles&gt;</code> components:</strong></p>
      <p>If you want to change any colors then you will have to specify <strong>all</strong> of the properties in the <code>colors</code> prop. If you do not, then you will get unexpected colors for your <code>&lt;Button&gt;</code> and <code>&lt;Link btnStyles&gt;</code> components.</p>
      <p>The <code>colors</code> prop will override the other props that deal with colors (i.e. <code>variant</code>, <code>inverted</code>).</p>`,
    ],
  ]}
/>

<br><br>

<h3 id="sizes">sizes</h3>

The components all use default values for font size, font weight, and padding (vertical and horizontal), which can all be changed in the `theme.css` file and/or the <code>defaults.ts</code> file. Many of the components also have a `sizes` prop that can be used for customizing the sizes of the component.

<Table
  header={[
    [
      "Prop name",
      "Type", 
      "Possible values",
      "Default value", 
      "Description",
    ],
  ]}
  body={[
    [
      "<code>sizes</code>",
      `<pre>{
  fs: number, 
  fw: string, 
  pv: number, 
  ph: number,
}</pre>`,
      `<p>The size properties <code>fs</code>, <code>pv</code>, and <code>ph</code> reference the <code>--size-{n}</code> CSS variables that are define in the <code>theme.css</code> file.</p>
      <p>So the possible values for <code>fs</code>, <code>pv</code>, and <code>ph</code> are <code>0</code> to <code>25</code> (or whatever the maximum number is that you have defined for the <code>--size-{n}</code> CSS variable in the <code>theme.css</code> file).<br><br><code>fw</code>: Any font weight.</p>`,
      `<pre>{
  fs: 4, 
  fw: "normal", 
  pv: 2, 
  ph: 3,
}</pre><p>These default values are set in the <code>getElementSizes()</code> function in the <code>default.ts</code> file and can be changed there.</p>`,
      `<p>You can change the component size by specifying the component's...</p>
      <ul>
        <li>font size (<code>fs</code>)</li>
        <li>font weight (<code>fw</code>)</li>
        <li>padding vertical (<code>pv</code>)</li>
        <li>padding horizontal (<code>ph</code>)</li>
      </ul>
      <p>Each property (<code>fs</code>, <code>fw</code>, <code>pv</code>, <code>ph</code>) is optional, so you can specify only the sizes you want to change and the other sizes will use default values.</p>
      <p>The CSS size variables (<code>--size-{n}</code>) in the <code>theme.css</code> file use a 16px base value (i.e. 1rem = 16px). Since each size number increments by .25rem (or 4px), you can determine the pixel size for each number that is passed to the <code>sizes</code> prop by multiplying the number by 4. (e.g. <code>fs: 6</code> = 6 x 4px = 24px font size).</p>`,
    ],
  ]}
/>

<br><br>

#### Important Note About How The `colors` And `sizes` Props Are Used In Components

This note describes how the `colors` and `sizes` props are used in components to style individual elements within a component. Some components only have a single element to style (e.g. buttons, input fields) while others have multiple elements that need to be styled in different ways (e.g. accordions, select boxes).

For most elements within a component, you can place something like this on the element:

```
style={`${getElementColors(colors).all} ${getElementSizes(sizes).all}`}
```

...and the `colors` and `sizes` that are passed to the component will be applied to the element. If any color or size properties are not passed to the component, then the default values will be used in place of those colors and/or sizes.

However, if you only want to apply one or two color or size styles to an element (within a component), then you can specify the style that you want to apply to the element like this:

```
style={`background-color: ${getElementColors(colors).bg}; font-size: ${getElementSizes(sizes).fs};`}
```

The `<Select>` component uses this method to apply different styles to different elements within the component.

<br><br>

<h3 id="rest-props">Rest Props</h3>

Rest props are used to capture the rest of the properties that are not specifically defined in the component. For example, you could pass an `id="abc"` prop to a `<Button>` component and the `id` will show up in the `<button>` in the DOM.

<br>

---

## This is what I would like these component docs to become.

On each page, I want to...

* Show the component.
* Show fields for the component's props and slots where I can edit the props and slots and the component would update to show how it would look with different configurations.
* Display the resulting code after the props and slots have been edited so I can copy and paste that code where I want it in my project.
* Have an area below that editable component area where I can add extra documentation about the component (e.g. Event Forwarding, other examples, additional explanations).

See the "Buttons" page for some early ideas/examples of what I am trying to do. 

Also, look at the following resources to get some ideas for how they do things:

* Bookit
    * I have forked the repo: https://github.com/SamuelEarl/bookit/tree/main
    * A video that shows a little bit of what Bookit is: https://www.youtube.com/watch?v=4J655eN_lfc.
* SvelteScape: https://github.com/AlessioGr/sveltescape

<br>

## Q: Why not use something like Storybook to develop and document your components?

## A:

* Storybook is a great tool, but it is not written in SvelteKit. So, as of this writing (March 2024), it requires workarounds to get some common scenarios to work with SvelteKit (e.g. slots, forms that either GET or POST data from/to a server). In some of those scenarios you can mock the data that is needed, but anytime you have to mock data you lose some confidence in how your components will work in an actual project. It is easier (and it instills more confidence) when you can simply create components using the same exact framework and environment that you are using in your real projects. 
* Using fewer dependencies often means fewer breaking changes. For example, when there are updates to Svelte, tools like Storybook are often not able to implement those updates for a while, which can introduce breaking changes with Storybook.
* You don't have to learn new tools. You can stay with the tools you are already familiar with. Testing libraries are a good example of this. Storybook has their own testing library that can be used to test your Storybook components. The Storybook testing library is not too different from many other testing libraries, but I personally don't want to learn extra testing syntax if I don't need to.
