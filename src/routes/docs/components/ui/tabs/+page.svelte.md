<script lang="ts">
  import {
    TabsContainer,
    TabBar, 
    Tab, 
    TabPanel,
    Link,
  } from "$lib/client/components";
</script>

# Tabs (tabbed content)

This `<Tabs />` component is borrowed from a component that Rich Harris created and which is referenced here: <Link href="https://stackoverflow.com/a/56826594/9453009" target="_blank">Stack Overflow</Link>.

I have simply restyled that component to match the rest of the Fanny Pack UI components.

---

## Example Usage

<TabsContainer
  border={true}
  containerPadding="var(--size-4)"
  tabSizes={{
    fs: 4, 
    fw: "normal", 
    pv: 2, 
    ph: 3,
  }}
  panelPadding={{
    top: 2,
    bottom: 2,
    left: 2,
    right: 2,
  }}
>
  <TabBar tabStyle="line">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br>

```svelte
<script lang="ts">
  import { TabsContainer, TabBar, Tab, TabPanel } from "$lib/client/components";
</script>

<TabsContainer
  border={true}
  containerPadding="var(--size-4)"
  tabSizes={{
    fs: 4, 
    fw: "normal", 
    pv: 2, 
    ph: 3,
  }}
  panelPadding={{
    top: 2,
    bottom: 2,
    left: 2,
    right: 2,
  }}
>
  <TabBar tabStyle="line">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>
```

<br>

The order of the `<Tab>` and `<TabPanel>` components matters. The first `<Tab>` is associated with the first `<TabPanel>`, the second `<Tab>` is associated with the second `<TabPanel>`, and so on.

There are two different tab styles: `fill` and `line`. The default style is `line`.

<br>

## Tabs without a border around them

This is how a `line` tab style looks without a border:

<TabsContainer border={false} containerPadding="var(--size-5)">
  <TabBar tabStyle="line">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br><br>

```svelte
<TabsContainer border={false} containerPadding="var(--size-5)">
  ...
</TabsContainer>
```

<br><br>

## Tabs with `fill` style

The next example shows how to set the tab style to `fill` with the `tabStyle` prop in the `<TabBar>` component.

<br>

<TabsContainer border={true} containerPadding="var(--size-2)">
  <TabBar tabStyle="fill">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br>

```svelte
<script lang="ts">
  import { TabsContainer, TabBar, Tab, TabPanel } from "$lib/client/components";
</script>

<TabsContainer border={true} containerPadding="var(--size-2)">
  <TabBar tabStyle="fill">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>
```

<br><br>

## `fill` style without a border

This is how a `fill` tab style looks without a border:

<br>

<TabsContainer border={false} containerPadding="0">
  <TabBar tabStyle="fill">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br>

```svelte
<TabsContainer border={false} containerPadding="0">
  <TabBar tabStyle="fill">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>
  ...
</TabsContainer>
```

<br>

## Tabs with `tab` style

This demo shows the `tab` style with no `border` or `containerPadding`.

<br>

<TabsContainer
  border={false}
  containerPadding="0"
  tabSizes={{
    fs: 4, 
    fw: "normal", 
    pv: 2, 
    ph: 3,
  }}
  panelPadding={{
    top: 2,
    bottom: 2,
    left: 2,
    right: 2,
  }}
>
  <TabBar tabStyle="tab">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>First Panel</h2>
    <p>This content is inside the first panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Second Panel</h2>
    <p>This content is inside the second panel...</p>
  </TabPanel>

  <TabPanel>
    <h2>Third Panel</h2>
    <p>This content is inside the third panel...</p>
  </TabPanel>
</TabsContainer>

<br>

```svelte
<TabsContainer border={false} containerPadding="0">
  <TabBar tabStyle="tab">
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    <Tab>Third Tab</Tab>
  </TabBar>
  ...
</TabsContainer>
```

---

## Props

<TabsContainer>
  <TabBar>
    <Tab>TabsContainer</Tab>
    <Tab>TabBar</Tab>
    <Tab>Tab</Tab>
  </TabBar>

  <TabPanel>
    <h2>TabsContainer</h2>

    <!-- I don't why, but inserting an element above the markdown table causes the markdown to convert to an HTML table. So, if I remove the following empty <div>, then the markdown table will display as a string of characters instead of a table. Hmmm. -->
    <div></div>

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `border` | `boolean` | `true`, `false` | `true` | This prop will add a border around the `<TabContainer>` component. |
    | `containerPadding` | `string` | Any CSS padding value or CSS size variable from your `theme.css` file. | `var(--size-4)` | The value that is passed to this prop will be applied as the padding between the border and the tab contents. |
    | `tabSizes` | See <a href="/docs#sizes" class="table-link">sizes</a>. ||||
    | `panelPadding` | `{ top: number, bottom: number, left: number, right: number }` | The values for each size property reference the `--size-{n}` CSS variables that are define in the `theme.css` file. So the possible values are 0 to 25 (or whatever the maximum number is that you have defined for the `--size-{n}` CSS variable in the theme.css file). | `{ top: 2, bottom: 2, left: 2, right: 2 }` | The values that are passed to the properties in this object prop will be applied as the padding for each panel. |

    </div>

    ---

    *NOTE: You can also wrap your tab components in a `<div>` and apply your own border and padding values. The above props are just for convenience.*

  </TabPanel>

  <TabPanel>
    <h2>TabBar</h2>
    
    <div></div>

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `tabStyle` | `string` | `fill`, `line`, `tab` | `line` | This prop sets the style of the tab bar and the tabs. |

    </div>

  </TabPanel>

  <TabPanel>
    <h2>Tab</h2>

    <div></div>

    <div class="responsive-table">

    | Prop name | Type | Possible values | Default value | Description |
    | --------- | ---- | --------------- | ------------- | ----------- |
    | `{...restProps}` | NA | Any attribute that you might want to pass to a `<Tab>` component, for example an `id` attribute. | NA | This component does not normally have attributes, but if you want to pass something like an `id` attribute to this component, then `restProps` allows you to do that. |

  </TabPanel>
</TabsContainer>
