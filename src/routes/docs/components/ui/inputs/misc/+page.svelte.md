<script lang="ts">
  import { Input } from "$lib/client/components";

  let textValue = $state("Change this text");
  let numberValue = $state(1);
  let email = $state("");
  let password = $state("");

  let browsers = [
    "Chrome",
    "Edge",
    "Firefox",
    "Opera",
    "Safari",
  ];
  let browser = $state("");

  let numbers = [1, 2, 3, 4, 5];
  let number = $state();
</script>


# Input (text, number, email, password)

---

## Example Usage

### Text Input

<div style="margin-bottom:20px">
  <Input
    type="text"
    bind:value={textValue}
    placeholder="Type right here"
    disabled={false}
  />
</div>

<p>Entered Text: {textValue}</p>

```svelte
<script>
  import { Input } from "$lib/client/components";

  let textValue = $state("Change this text");
</script>

<div style="margin-bottom:20px">
  <Input
    type="text"
    bind:value={textValue}
    placeholder="Type right here"
    disabled={false}
  />
</div>
```

### Number Input

<div style="margin-bottom:20px">
  <Input
    type="number"
    bind:value={numberValue}
    placeholder="Type right here"
    disabled={false}
    min="0"
    max="10"
    step="0.5"
  />
</div>

<p>Entered Number: {numberValue}</p>

```svelte
<script>
  import { Input } from "$lib/client/components";

  let numberValue = $state(1);
</script>

<div style="margin-bottom:20px">
  <Input
    type="number"
    bind:value={numberValue}
    placeholder="Type right here"
    disabled={false}
    min="0"
    max="10"
    step="0.5"
  />
</div>
```

### Email Input

<div style="margin-bottom:20px">
  <Input
    type="email"
    bind:value={email}
    placeholder="Type email here"
    disabled={false}
  />
</div>

<p>Entered Email: {email}</p>

```svelte
<script>
  import { Input } from "$lib/client/components";

  let email = $state("");
</script>

<div style="margin-bottom:20px">
  <Input
    type="email"
    bind:value={email}
    placeholder="Type email here"
    disabled={false}
  />
</div>
```

### Password Input

<div style="margin-bottom:20px">
  <Input
    type="password"
    bind:value={password}
    placeholder="Type password here"
    disabled={false}
  />
</div>

<p>Entered Password: {password}</p>

```svelte
<script>
  import { Input } from "$lib/client/components";

  let password = $state("");
</script>

<div style="margin-bottom:20px">
  <Input
    type="password"
    bind:value={password}
    placeholder="Type password here"
    disabled={false}
  />
</div>
```

---

## `<datalist>`

A `<datalist>` allows you to specify a list of predefined options for an `<input>` element, but users can also enter their own data into the `<input>` element. As a user types inside an `<input>` element that has a `<datalist>` element bound to it, the list of predefined options will get filtered based on the user's input. 

NOTE: In order to bind a `<datalist>` element to an `<input>` element, the `<datalist>` element's `id` attribute should match the `<input>` element's `list` attribute.

<br>

<div style="margin-bottom:20px">
  <Input
    type="text"
    bind:value={browser}
    list="browsers"
    placeholder="Enter a browser name"
  />
  <datalist id="browsers">
    {#each browsers as browserOpt}
      <option value={browserOpt}>{browserOpt}</option>
    {/each}
  </datalist>
</div>

```svelte
<script lang="ts">
  let browsers = [
    "Chrome",
    "Edge",
    "Firefox",
    "Opera",
    "Safari",
  ];
  let browser = $state("");
</script>

<div style="margin-bottom:20px">
  <Input
    type="text"
    bind:value={browser}
    list="browsers"
    placeholder="Enter a browser name"
  />
  <datalist id="browsers">
    {#each browsers as browserOpt}
      <option value={browserOpt}>{browserOpt}</option>
    {/each}
  </datalist>
</div>
```

<br>

<div style="margin-bottom:20px">
  <Input
    type="number"
    bind:value={number}
    list="numbers"
    placeholder="Enter a number"
  />
  <datalist id="numbers">
    {#each numbers as numberOpt}
      <option value={numberOpt}>{numberOpt}</option>
    {/each}
  </datalist>
</div>

```svelte
<script lang="ts">
  let numbers = [1, 2, 3, 4, 5];
  let number = $state();
</script>

<div style="margin-bottom:20px">
  <Input
    type="number"
    bind:value={number}
    list="numbers"
    placeholder="Enter a number"
  />
  <datalist id="numbers">
    {#each numbers as numberOpt}
      <option value={numberOpt}>{numberOpt}</option>
    {/each}
  </datalist>
</div>
```

---

## Props

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `type` | `string` | `text`, `number`, `email`, `password` | `text` | This prop sets the input field type. |
| `bind:value` | `string` | Any string | None | In order for the input field to be updated with a `string` value, this component's `value` property needs to be bound to a `string` variable. |
| `list` | `string` | Any string | `""` (empty string) | See the `<datalist>` examples above for details. |
| `placeholder` | `string` | Any string | NA | This prop will act as the placeholder when the input field is empty. |
| `colors` | See <a href="/docs#colors" class="table-link">colors</a>. ||||
| `sizes` | See <a href="/docs#sizes" class="table-link">sizes</a>. ||||
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the input field. |
| `min` (number input types only) | `string` | Any numeric string value | `null` (i.e. no `min` value is set by default) | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#min |
| `max` (number input types only) | `string` | Any numeric string value | `null` (i.e. no `max` value is set by default) | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#max |
| `step` (number input types only) | `string` | Any numeric string value | `"any"` (i.e. no stepping in implied, and any value is allowed) | See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number#step |
| `...restProps` | See <a href="/docs/#rest-props" class="table-link">Rest Props</a> |

<br>
<br>

## Event Forwarding

| Event | Description |
| ----- | ----------- |
| `onchange` | This component forwards the `change` event, so you can call an event handler when a user changes the value in the input field and then the input field loses focus. |
| `oninput` | This component forwards the `input` event, so you can call an event handler when a user enters a value into the input field. |
| `onblur` | This component forwards the `blur` event, so you can call an event handler when this component loses focus. |
| `onkeyup` | This component forwards the `keyup` event, so you can call an event handler when a user presses a key while this component has focus. |
