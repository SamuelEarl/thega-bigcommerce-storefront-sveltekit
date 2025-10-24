<script lang="ts">
  import { Textarea } from "$lib/client/components";

  let textValue = "Change this text";
  let isDisabled = false;

  function eventHandler() {
    alert("Works!");
  }
</script>


# Textarea

---

## Example Usage

<div style="margin-bottom:20px">
  <Textarea
    bind:value={textValue}
    padding="var(--size-2)"
    fontSize="var(--size-base)"
    placeholder="Enter description"
    disabled={isDisabled}
    onkeyup={() => console.log("EVENT FIRED")}
  />
</div>

<p>Entered Text: {textValue}</p>

```svelte
<script>
  import { Textarea } from "$lib/client/components";

  let textValue = "Change this text";
  let isDisabled = false;
</script>

<div style="margin-bottom:20px">
  <Textarea
    bind:value={textValue}
    padding="var(--size-2)"
    fontSize="var(--size-base)"
    placeholder="Enter description"
    disabled={isDisabled}
    onkeyup={() => console.log("EVENT FIRED")}
  />
</div>
```

---

## Props
| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `bind:value` | `string` | Any string | `""` (empty string) | In order for the `textarea` field to be updated with a string value, this component’s value property needs to be bound to a string variable. |
| `colors` | See <a href="/docs#colors" class="table-link">colors</a>. ||||
| `sizes` | See <a href="/docs#sizes" class="table-link">sizes</a>. ||||This prop will set the font size for the input field.<br><br>The default value can be changed in the `theme.css` file. |
| `placeholder` | `string` | Any string | NA | This prop will act as the placeholder when the `textarea` field is empty. |
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the `textarea` field. |
| `{...restProps}` | NA | Any attribute that you can pass to a `<textarea>` element. | NA | This component does not specify every possible attribute that you can pass to a `<textarea>` element. However, `restProps` allows you to pass any attributes to this `<Textarea />` component that you could normally pass to a `<textarea>` element. For example, if you want to specify a taller `<Textarea>` component, then you could pass the `rows` prop, like this: `rows="10"` |

<br>

## Event Forwarding
| Event | Description |
| ----- | ----------- |
| `onchange` | This component forwards the `change` event, so you can call an event handler when a user changes the value in the `textarea` field and then the `textarea` field loses focus. |
| `oninput` | This component forwards the `input` event, so you can call an event handler when a user enters a value into the `textarea` field. |
| `onkeyup` | This component forwards the `keyup` event, so you can call an event handler when a user presses a key while this component has focus. |
| `onblur` | This component forwards the `blur` event, so you can call an event handler when this component loses focus. |
