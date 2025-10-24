<script lang="ts">
  import { Checkbox } from "$lib/client/components";

  let haveRead = $state(false);
  let checkboxLabel = "I have read the terms and conditions.";

  let checked = $state(false);
</script>

# Checkbox
This component will create a single checkbox. If you want to create multiple checkboxes that are part of the same group, then look at the [Checkbox Group](/docs/components/checkbox-group) component.

---

## Example Usage

<Checkbox
  bind:checked={haveRead}
  label={checkboxLabel}
  disabled={false}
/>

<p>Your selection: <strong>{haveRead}</strong></p>

```svelte
<script>
  import { Checkbox } from "$lib/client/components";

  let haveRead = false;
  let checkboxLabel = "I have read the terms and conditions.";
</script>

<Checkbox
  bind:checked={haveRead}
  label={checkboxLabel}
  disabled={false}
/>

<p>Your selection: <strong>{haveRead}</strong></p>
```

You can use the `onchange` or `oninput` event like this:

```svelte
<script>
  ...

  function handleChange() {
    alert("Checkbox has been changed");
  }
</script>

<Checkbox
  bind:checked={haveRead}
  label={checkboxLabel}
  disabled={false}
  onchange={handleChange}
/>
```

<hr>

## Props

<div class="responsive-table">

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `bind:checked` | `boolean` | `true`, `false` | NA | In order for the checkbox to be checked and unchecked, this component's `checked` property needs to be bound to a `boolean` variable. |
| `label` | `string` | Any string | NA | This is the text that will be displayed next to the checkbox. |
| `disabled` | `boolean` | `true`, `false` | `false` | This will disable the checkbox. |
| `marginBottom` | `string` | Any CSS margin value or CSS size variable from your `theme.css` file. | `var(--size-2)` | This prop will set the default `margin-bottom` for the checkbox.<br><br>The default value for all checkboxes can be changed in the `theme.css` file. |

</div>

<br>

## Event Forwarding

<div class="responsive-table">

| Event | Description |
| ----- | ----------- |
| `onchange` | This component forwards the `change` event, so you can call an event handler with `onchange={handlerFunction}` when a user checks this `<Checkbox>` component. |
| `oninput` | This component forwards the `input` event, so you can call an event handler with `oninput={handlerFunction}` when a user checks this `<Checkbox>` component. |

</div>
