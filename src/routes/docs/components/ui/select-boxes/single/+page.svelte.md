<script lang="ts">
  import { Input, Select, Checkbox } from "$lib/client/components";

  const jobOptionsStrings = [
    "UI/UX Designer",
    "Frontend Engineer",
    "Backend Engineer",
    "QA Engineer",
    "Unicorn",
	];
  let selectedJobOptionString = $state(jobOptionsStrings[0]);

  let needVacation = $state(false);

  const jobOptionsObjects = [
    { roleVal: "", roleLabel: "-- Select Role --" },
    { roleVal: "ds", roleLabel: "UI/UX Designer" },
    { roleVal: "fe", roleLabel: "Frontend Engineer" },
    { roleVal: "be", roleLabel: "Backend Engineer" },
    { roleVal: "qa", roleLabel: "QA Engineer" },
    { roleVal: "un", roleLabel: "Unicorn" },
	];

  const optionValue = "roleVal";
  const optionLabel = "roleLabel";
  let selectedValuePropertyFromJobOptionsObject = $state(jobOptionsObjects[0][optionValue]);

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let selectedMonth = $state("July");

  function handleChange(event) {
    console.log("Selected Value:", event.target.value);
  }

  const dinoObjects = [
    { dinoGroup: "Theropods", dinoValue: "tyrannosaurus", dinoLabel: "Tyrannosaurus" },
    { dinoGroup: "Theropods", dinoValue: "velociraptor", dinoLabel: "Velociraptor" },
    { dinoGroup: "Sauropods", dinoValue: "diplodocus", dinoLabel: "Diplodocus" },
    { dinoGroup: "Sauropods", dinoValue: "saltasaurus", dinoLabel: "Saltasaurus" },
    { dinoGroup: "Theropods", dinoValue: "deinonychus", dinoLabel: "Deinonychus" },
    { dinoGroup: "Sauropods", dinoValue: "apatosaurus", dinoLabel: "Apatosaurus" },
  ];
  let selectedDinoValue = $state(dinoObjects.find(obj => obj.dinoValue === "diplodocus")["dinoValue"]);

  let textValue = "Hello there";
</script>


# Select (single select)

`<select>` elements are difficult to style while maintaining accessibility. The easiest (and possibly the best) way to create an accessible `<Select />` component is to use the native `<select>` element and simply style the button part while leaving the dropdown as it is provided natively by the browser.

---

## Example Usage

### `options` elements with "primitive" data type

Most `<Select />` components will probably just use a simple array of string values as in this example:

<br>

<div style="margin-bottom:20px;">
  <Select 
    options={jobOptionsStrings}
    bind:value={selectedJobOptionString}
    sizes={{fs:4, fw:"normal", pv:2, ph:3}}
    disabled={needVacation}
    onchange={handleChange}
  />
</div>

<Checkbox
  bind:checked={needVacation}
  label="Disable select component"
/>

Value of `selectedJobOptionString`: <code>{selectedJobOptionString}</code>

<br>

```
<script>
  import { Select, Checkbox } from "$lib/client/components";

  const jobOptionsStrings = [
    "UI/UX Designer",
    "Frontend Engineer",
    "Backend Engineer",
    "QA Engineer",
    "Unicorn",
  ];
  let selectedJobOptionString = $state(jobOptionsStrings[0]);
  let needVacation = $state(false);

  function handleChange(event) {
    console.log("Selected Value:", event.target.value);
  }
</script>

<div style="margin-bottom:20px;">
  <Select 
    options={jobOptionsStrings}
    bind:value={selectedJobOptionString}
    disabled={needVacation}
    onchange={handleChange}
  />
</div>

<Checkbox
  bind:checked={needVacation}
  label="Disable select component"
/>
```

---

### `options` elements with "object" data type

What if you want each option in your `<Select />` component to have values that are different from their labels? Take the following native select element as an example. The code for it is below.

<div style="margin-bottom:20px;">
  <select>
    <option value="">-- Select role --</option>
    <option value="ds">UI/UX Designer</option>
    <option value="fe">Frontend Engineer</option>
    <option value="be">Backend Engineer</option>
    <option value="qa">QA Engineer</option>
    <option value="un">Unicorn</option>
  </select>
</div>

```
<select>
  <option value="">-- Select Role --</option>
  <option value="ds">UI/UX Designer</option>
  <option value="fe">Frontend Engineer</option>
  <option value="be">Backend Engineer</option>
  <option value="qa">QA Engineer</option>
  <option value="un">Unicorn</option>
</select>
```

Notice how the values for each option are different from their labels? You would probably have to pass an array of objects that looked something like this to the select element:

```
const jobOptionsObjects = [
  { roleVal: "", roleLabel: "-- Select Role --" },
  { roleVal: "ds", roleLabel: "UI/UX Designer" },
  { roleVal: "fe", roleLabel: "Frontend Engineer" },
  { roleVal: "be", roleLabel: "Backend Engineer" },
  { roleVal: "qa", roleLabel: "QA Engineer" },
  { roleVal: "un", roleLabel: "Unicorn" },
];
```

The problem is that native select elements can only handle primitive data types, so you might have to pass an array of strings to your Svelte select element (as in the first example) and just live with that. No separate values or labels. Bummer. However, you can pass an object to a native select element written with Svelte and just make a few adjustments to your Svelte code, which would look like this:

<div style="margin-bottom:20px;">
  <select bind:value={selectedValuePropertyFromJobOptionsObject}>
    {#each jobOptionsObjects as option}
      <option value={option[optionValue]}>{option[optionLabel]}</option>
    {/each}
  </select>
</div>

Value of `selectedValuePropertyFromJobOptionsObject`: <code>{selectedValuePropertyFromJobOptionsObject}</code>

```
<script>
  const jobOptionsObjects = [
    { roleVal: "", roleLabel: "-- Select Role --" },
    { roleVal: "ds", roleLabel: "UI/UX Designer" },
    { roleVal: "fe", roleLabel: "Frontend Engineer" },
    { roleVal: "be", roleLabel: "Backend Engineer" },
    { roleVal: "qa", roleLabel: "QA Engineer" },
    { roleVal: "un", roleLabel: "Unicorn" },
  ];

  let selectedValuePropertyFromJobOptionsObject = $state(jobOptionsObjects[0]["roleVal"]);
</script>

<select bind:value={selectedValuePropertyFromJobOptionsObject}>
  {#each jobOptionsObjects as option}
    <option value={option["roleVal"]}>{option["roleLabel"]}</option>
  {/each}
</select>
```

You can do the same with this Fanny Pack `<Select />` component. You just have to specify which properties in your data objects should be used as the option values and which should be the option labels:

<div style="margin-bottom:20px;">
  <Select 
    options={jobOptionsObjects}
    optionValue="roleVal"
    optionLabel="roleLabel"
    bind:value={selectedValuePropertyFromJobOptionsObject}
  />
</div>

Value of `selectedValuePropertyFromJobOptionsObject`: <code>{selectedValuePropertyFromJobOptionsObject}</code>

```
<script>
  const jobOptionsObjects = [
    { roleVal: "", roleLabel: "-- Select Role --" },
    { roleVal: "ds", roleLabel: "UI/UX Designer" },
    { roleVal: "fe", roleLabel: "Frontend Engineer" },
    { roleVal: "be", roleLabel: "Backend Engineer" },
    { roleVal: "qa", roleLabel: "QA Engineer" },
    { roleVal: "un", roleLabel: "Unicorn" },
  ];

  let selectedValuePropertyFromJobOptionsObject = $state(jobOptionsObjects[0]["roleVal"]);
</script>

<Select 
  options={jobOptionsObjects}
  optionValue="roleVal"
  optionLabel="roleLabel"
  bind:value={selectedValuePropertyFromJobOptionsObject}
/>
```

### Option Groups

You can group your options using the [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup) tag by passing a property name to the `optgroup` prop. The property name that you pass should be a property name that exists in the objects that are within your `options` array. The `optgroup` prop is only used with `options` arrays that contain objects, not with `options` arrays that contain primitive values.

<div style="margin-bottom:20px;">
  <Select
    options={dinoObjects}
    optionValue="dinoValue"
    optionLabel="dinoLabel"
    optgroup="dinoGroup"
    bind:value={selectedDinoValue}
  />
</div>

Value of `selectedDinoValue`: <code>{selectedDinoValue}</code>

```
<script>
  const dinoObjects = [
    { dinoGroup: "Theropods", dinoValue: "tyrannosaurus", dinoLabel: "Tyrannosaurus" },
    { dinoGroup: "Theropods", dinoValue: "velociraptor", dinoLabel: "Velociraptor" },
    { dinoGroup: "Sauropods", dinoValue: "diplodocus", dinoLabel: "Diplodocus" },
    { dinoGroup: "Sauropods", dinoValue: "saltasaurus", dinoLabel: "Saltasaurus" },
    { dinoGroup: "Theropods", dinoValue: "deinonychus", dinoLabel: "Deinonychus" },
    { dinoGroup: "Sauropods", dinoValue: "apatosaurus", dinoLabel: "Apatosaurus" },
  ];

  let selectedDinoValue = $state(dinoObjects.find(obj => obj.dinoValue === "diplodocus")["dinoValue"]);
</script>

<Select
  options={dinoObjects}
  optgroup="dinoGroup"
  optionValue="dinoValue"
  optionLabel="dinoLabel"
  bind:value={selectedDinoValue}
/>

Value of `selectedDinoValue`: <code>{selectedDinoValue}</code>
```

Note that the `optgroup`s within the `<Select />` component will be sorted based on the first appearance of the property that is passed to the `optgroup` prop. For example, in the `dinoObjects` array shown above, the `dinoGroup` property is passed to the `optgroup` prop, so the `dinoObjects` array will be sorted based the `dinoGroup` property. The first `dinoGroup` property that appears in the `dinoObjects` array has a value of `Theropods`, so that will be the first `optgroup` listed in the `<Select />` component's options list. The second `dinoGroup` property that appears has a value of `Sauropods`, so that will be the second `optgroup` listed in the `<Select />` component's options list. And so on.

---

## Note
* The `<Select />` component will fill the width of its parent element. So if you want a `<Select />` component to be narrower, then you will have to set its parent element to be narrower.

---

## Props

<div class="responsive-table">

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `options` | `Array` | Any array | NA | This should be an array of strings, numbers, booleans, or objects. This array will be used to populate the `<option>` elements in the `<Select />` component's dropdown list. |
| `optionValue` (only used with arrays of objects) | `string` | Any property name from the objects that are passed to the `options` array | `""` | When the `optionValue` prop is used with an array of objects (which are passed to the `options` prop), the `optionValue` prop will provide the property name that will be used as the value for each of the options in the `<Select />` component. |
| `optionLabel` (only used with arrays of objects) | `string` | Any property name from the objects that are passed to the `options` array | `""` | When the `optionLabel` prop is used with an array of objects (which are passed to the `options` prop), the `optionLabel` prop will provide the property name that will be used as the label text for each of the options in the `<Select />` component. |
| `optgroup` (only used with arrays of objects) | `string` | Any property name from the objects that are passed to the `options` array | `""` | You can group your options using the [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup) tag by passing a property name to the `optgroup` prop. The property name that you pass should be a property name that exists in the objects that are within your `options` array. The `optgroup` prop is only used with `options` arrays that contain objects, not with `options` arrays that contain primitive values. |
| `bind:value` | `string`, `number`, `boolean`, `object` | Any element from the `options` array | NA<br><br>There is no default value for this prop. However, you should set `bind:value` to equal a value from the array that you pass to the `options` prop. The value that `bind:value` is equal to will be the default value displayed in the select box. | When a user selects an option from the `<Select />` component, that option will be bound to the variable that is passed to this prop.
| `colors` | See <a href="/docs#colors" class="table-link">colors</a>. ||||
| `sizes` | See <a href="/docs#sizes" class="table-link">sizes</a>. ||||
| `arrowWidth` | `string` | A CSS measurement value that SVG elements can interpret | `1rem` | This prop will set the width of the arrow that appears on the right side of the `<Select>` component. |
| `arrowHeight` | `string` | A CSS measurement value that SVG elements can interpret | `1rem` | This prop will set the height of the arrow that appears on the right side of the `<Select>` component. |
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the `<Select />` component. |
| `...restProps` | See <a href="/docs/#rest-props" class="table-link">Rest Props</a> |

</div>

---

## Event Forwarding

<div class="responsive-table">

| Event | Description |
| ----- | ----------- |
| `onchange` | This component forwards the `change` event, so you can call an event handler when a user selects a value in the `<Select />` component. |

</div>

<style>
  select {
    padding: 10px;
    border-radius: var(--radius);
    background-color: var(--element-bg);
  }

  .alt-background {
    padding: 25px;
    border-radius: var(--radius);
    background-color: var(--secondary-bg);
  }
</style>
