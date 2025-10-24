<script lang="ts">
  import { Button, Icon, Link, Tooltip } from "$lib/client/components";
</script>

# Tooltip

This component uses <Link href="https://atomiks.github.io/tippyjs/" target="_blank">Tippy.js</Link> to create tooltips.

---

## Example Usage

<p>Hover over the icon at the end of this sentence to see the tooltip.
  <Tooltip content={`You can easily create \n tooltips that have \n multi-line content.`}>
    <Icon icon="entypo:info-with-circle" />
  </Tooltip>
</p>

<div style="margin-bottom:20px">
  <Tooltip content="This button displays a tooltip">
    <Button>
      Hover over this button
    </Button>
  </Tooltip>
</div>

```svelte
<script lang="ts">
  import { Button, Icon, Tooltip } from "$lib/client/components";
</script>

<p>Hover over the icon at the end of this sentence to see the tooltip.
  <Tooltip content={`You can easily create \n tooltips that have \n multi-line content.`}>
    <Icon icon="entypo:info-with-circle" />
  </Tooltip>
</p>

<div style="margin-bottom:20px">
  <Tooltip content="This button displays a tooltip">
    <Button>
      Hover over this button
    </Button>
  </Tooltip>
</div>
```

You can wrap a `<Tooltip>` component around any DOM element or any other component you want. All you need to do is pass the tooltip content that you want to appear when a user hovers over the tooltip.


---

## Props

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `content` | `string` | Any string | NA | This prop accepts a string argument that will act as the tooltip text when a user hovers over the tooltip element. Multi-line strings can be created with newline characters that are inside of backticks, which are inside of curly braces. See the code examples above. |
