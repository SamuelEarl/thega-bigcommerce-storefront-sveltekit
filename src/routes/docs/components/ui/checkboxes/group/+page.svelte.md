<script lang="ts">
  import { Checkbox, CheckboxGroup } from "$lib/client/components";

  const primitiveOptions = [
    "Oversized Wheels",
    "Mud Tires",
    "Mud Guards",
    "Trail Running Boards",
    "Roof Rack",
  ];
  let selectedPrimitiveOptions = $state([]);

  const objectOptions = [
    { label: "Oversized Wheels", value: "oversizedWheels" },
    { label: "Mud Tires", value: "mudTires" },
    { label: "Mud Guards", value: "mudGuards" },
    { label: "Trail Running Boards", value: "trailRunningBoards" },
    { label: "Roof Rack", value: "roofRack" },
  ];
  let selectedObjectOptions = $state([objectOptions[0].value]);

  const demoOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack"];
  let selectedDemoOptions = $state([demoOptions[0]]);
</script>

# Checkbox Group

This component will create multiple checkboxes that are part of the same group. In a checkbox group, the selected values will populate a single array that could then be sent to the backend for processing or storage. 

The `<CheckboxGroup>` component can also be useful in scenarios where you are working with a dynamic array of data and you don't know what values are in the dynamic array (so you wouldn't know what checkbox values would be needed when you are coding the form). In that kind of scenario the `<CheckboxGroup>` component could be used to display one checkbox for each element in the array. 

You can read more about this component under the "Plain HTML vs Svelte Checkboxes" heading toward the bottom of this page.

---

## Example Usage

<br>

### With primitive data types

You can pass an array of strings, numbers, or booleans to the `optionsArray` prop. For example:

<br>

<p>Select all the options you want for your SUV:</p>

<CheckboxGroup
  optionsArray={primitiveOptions}
  bind:selectedValues={selectedPrimitiveOptions}
  disabled={false}
/>

<p>Value of <code>selectedPrimitiveOptions</code>: <code>{JSON.stringify(selectedPrimitiveOptions)}</code></p>

<br>

```svelte
<script>
  import { CheckboxGroup } from "$lib/client/components";

  const primitiveOptions = [
    "Oversized Wheels",
    "Mud Tires",
    "Mud Guards",
    "Trail Running Boards",
    "Roof Rack",
  ];

  let selectedPrimitiveOptions = $state([]);
</script>

<p>Select all the options you want for your SUV:</p>

<CheckboxGroup
  optionsArray={primitiveOptions}
  bind:selectedValues={selectedPrimitiveOptions}
  disabled={false}
/>

<p>Value of <code>selectedPrimitiveOptions</code>: <code>{JSON.stringify(selectedPrimitiveOptions)}</code></p>
```

<br><br>

### With object data types

You can use also use labels that are different from the values for each checkbox by passing an array of objects to the `optionsArray` prop. Each object inside the array should have `label` and `value` properties. For example:

<br>

<p>Select all the options you want for your SUV:</p>

<CheckboxGroup
  optionsArray={objectOptions}
  bind:selectedValues={selectedObjectOptions}
  disabled={false}
/>

<p>Value of <code>selectedObjectOptions</code>: <code>{JSON.stringify(selectedObjectOptions)}</code></p>

```svelte
<script>
  import { CheckboxGroup } from "$lib/client/components";

  const objectOptions = [
    { label: "Oversized Wheels", value: "oversizedWheels" },
    { label: "Mud Tires", value: "mudTires" },
    { label: "Mud Guards", value: "mudGuards" },
    { label: "Trail Running Boards", value: "trailRunningBoards" },
    { label: "Roof Rack", value: "roofRack" },
  ];

  let selectedObjectOptions = $state([objectOptions[0].value]);
</script>

<p>Select all the options you want for your SUV:</p>

<CheckboxGroup
  optionsArray={objectOptions}
  bind:selectedValues={selectedObjectOptions}
  disabled={false}
/>

<p>Value of <code>selectedObjectOptions</code>: <code>{JSON.stringify(selectedObjectOptions)}</code></p>
```

<hr>

## Props

<div class="responsive-table">

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `optionsArray` | `array` | Any array | NA | The array that is passed to this prop is the array of values that will be looped over to create the checkboxes. |
| `bind:selectedValues` | `array` | An array of primitive data types or and array of objects with a `label` and a `value` property | `[]` (an empty array) | The array that is passed to this prop will hold the values that the user will select. This array will usually be an empty array, but if you want any values to be pre-selected, then you could include any of the values from the `optionsArray` array. |
| `disabled` | `boolean` | `true`, `false` | `false` | This will disable all the checkboxes in the group. |
| `marginBottom` | `string` | Any CSS margin value or CSS size variable from your `theme.css` file. | `var(--size-4)` | This prop will set the default `margin-bottom` for the checkboxes in the group.|

</div>

<br>

## Event Forwarding

<div class="responsive-table">

| Event | Description |
| ----- | ----------- |
| `onchange` | This component forwards the `change` event, so you can call an event handler with `onchange={handlerFunction}` when a user checks a box in this `<CheckboxGroup>` component. |
| `oninput` | This component forwards the `input` event, so you can call an event handler with `oninput={handlerFunction}` when a user checks a box in this `<CheckboxGroup>` component. |

</div>

---

<br>

## Plain HTML vs Svelte Checkboxes

### Plain HTML Checkboxes
In plain HTML, checkboxes are typically defined with `name`/`value` pairs inside a `<form>` element, like this:

```html
<form action="http://www.example.com" method="POST">
  <label>
  	<input type="checkbox" name="oversized wheels" value=true> Oversized Wheels
  </label>
  <br>
  <label>
  	<input type="checkbox" name="mud tires" value=true> Mud Tires
  </label>
  <br>
  <label>
  	<input type="checkbox" name="mud guards" value=true> Mud Guards
  </label>
  <br>
  <input type="submit" value="Submit">
</form>
```

Notice that each checkbox is independent of the others. In other words, there is no `group` attribute or option.

When the form is submitted, the request will include the `name`/`value` pairs in the `request body`, which would look like this (assuming the first two checkboxes were checked):

```
oversized wheels=true&mud tires=true 
```

### Svelte Checkboxes
In Svelte, you can also create individual checkboxes, similar to how you would in plain HTML. (The [`<Checkbox>`](/docs/components/checkbox) component is an example of this.) But Svelte also gives you a `bind:group` option. The `bind:group` option allows you to group a set of checkboxes together and the selected values from those checkboxes will populate a single array that could then be sent to the backend for storage or processing. So instead of a set of `name`/`value` pairs for each checkbox, the request `body` would include an array that contains the values from all the checkboxes that the user selected.

So the `bind:group` option for Svelte checkboxes is a nice add-on feature that does not exist in plain HTML. So when working with Svelte checkboxes, you could use either regular checkboxes or "grouped" checkboxes.

### Could I loop over a regular `<Checkbox>` component to create a group of checkboxes?
When creating "grouped" checkboxes, you could create them using regular `<Checkbox>` components inside an `{#each}` loop, but you might not get the results you want. This is one example of what that might look like in code:

```svelte
<script>
  const demoOptions = ["oversized wheels", "mud tires", "mud guards", "trail running boards", "roof rack"];
  let selectedDemoOptions = [demoOptions[0]];
</script>

<p>Select all the options you want for your SUV:</p>

{#each demoOptions as option, index}
  <Checkbox bind:checked={selectedDemoOptions[index]} label={option} />
{/each}

<p>Value of <code>selectedObjectOptions</code>: <code>{JSON.stringify(selectedDemoOptions)}</code></p>
```

But this is how the above code would actually work:

<p>Select all the options you want for your SUV:</p>

{#each demoOptions as option, index}
  <Checkbox bind:checked={selectedDemoOptions[index]} label={option} />
{/each}

<p>Value of <code>selectedDemoOptions</code>: <code>{JSON.stringify(selectedDemoOptions)}</code></p>

<br>

You can see that the `selectedDemoOptions` array gets populated, but it gets populated with `true` and `false` values instead of the value of the checkbox that was selected. This may or may not work for your situation. Also, binding default checked values might not work. There are other ways to work with "grouped" checkboxes and you can read more about this issue here: https://github.com/sveltejs/svelte/issues/2308.)

In most cases it would probably be best to either create a series of regular `<Checkbox>` components and bind each one to its own variable or use this `<CheckboxGroup>` component, which will bind the checkbox values to an array.
