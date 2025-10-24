<script lang="ts">
  import { Icon, Input, Label, Tooltip } from "$lib/client/components";

  const id1 = "short-desc";
  const id2 = "short-desc-with-tooltip";
  let value1 = $state("");
  let value2 = $state("");
</script>

# Labels

This component provides a standardized `<label>` element for form fields.

---

## Example Usage

<br>

### Explicit label with the `for` attribute

<div>
  <Label text="Short Description" for={id1} align="left" /> 
  <Input type="text" bind:value={value1} id={id1} />
</div>

<br>

```svelte
<script lang="ts">
  import { Input, Label } from "$lib/client/components";

  const id1 = "short-desc";
  let value1 = $state("");
</script>

<div>
  <Label text="Short Description" for={id1} align="left" /> 
  <Input type="text" bind:value={value1} id={id1} />
</div>
```

<br>

### Implicit label (no `for` attribute)

<div>
  <Label text="Short Description" align="left"> 
    <Input type="text" bind:value={value1} />
  </Label>
</div>

<br>

```svelte
<script lang="ts">
  import { Input, Label } from "$lib/client/components";

  let value1 = $state("");
</script>

<div>
  <Label text="Short Description" align="left"> 
    <Input type="text" bind:value={value1} />
  </Label>
</div>
```

<br>

## Add tooltips to a label

<div>
  <span style="display: flex; align-items: baseline; gap: 5px;">
    <Label text="Short Description" for={id2} /> 
    <Tooltip content="Add a tooltip next to a label">
      <Icon icon="entypo:info-with-circle" />
    </Tooltip>
  </span>
  <Input type="text" bind:value={value2} id={id2} />
</div>

<br>

```svelte
<script lang="ts">
  import { Icon, Input, Label, Tooltip } from "$lib/client/components";

  const id2 = "short-desc-with-tooltip";
  let value2 = $state("");
</script>

<div>
  <span style="display: flex; align-items: baseline; gap: 5px;">
    <Label text="Short Description" for={id2} /> 
    <Tooltip content="Add a tooltip next to a label">
      <Icon icon="entypo:info-with-circle" />
    </Tooltip>
  </span>
  <Input type="text" bind:value={value2} id={id2} />
</div>
```

<br>

## Props

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `text` | `string` | Any string | None | This prop will provide the text for the label. |
| `align` | `string` | `left`, `right` | `left` | This prop will align the label to the left or the right above the form field. |
