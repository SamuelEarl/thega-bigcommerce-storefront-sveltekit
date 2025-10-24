<script lang="ts">
  import { 
    Icon,
    Label, 
    SelectMulti,
    Tooltip,
  } from "$lib/client/components";

  let primitiveOptions = [
    "oversized wheels", 
    "mud tires", 
    "mud guards", 
    "trail running boards", 
    "roof rack"
  ];
  let selectedPrimitiveOptions = $state([]);
  let labelText = "Select Your SUV Options";

  let objectOptions = [
    { label: "Oversized Wheels", value: "oversizedWheels" },
    { label: "Mud Tires", value: "mudTires" },
    { label: "Mud Guards", value: "mudGuards" },
    { label: "Trail Running Boards", value: "trailRunningBoards" },
    { label: "Roof Rack", value: "roofRack" },
  ];
  let selectedObjectOptions = $state([objectOptions[0].value]);

  const id1 = "abc123";
  const id2 = "def456";

  function handleChange(event) {
    console.log("handleChange");
  }
</script>


# Select (multi select)

Because of the different ways of selecting options (depending on the browser), and because you have to inform the user that multiple selection is available, it is more user-friendly to use checkboxes instead of a `<select>` element with the `multiple` attribute. See https://www.w3schools.com/tags/att_select_multiple.asp.

This component is essentially the [`<CheckboxGroup>`](/docs/components/checkbox-group) component inside a modal. In addition, this component preserves to order in which users select the options as opposed to sorting the options in the same order that they are listed in the modal. This can be beneficial is situations where the selection order matters.

---

TODO: I need to make this component accessible and test it with screen readers. See my accessibility notes at the bottom of this page.

---

## Example Usage

### `options` elements with primitive data types

<br>

<Label text={labelText} for={id1}>
  <Tooltip content={`Select as many as you want`}>
    <Icon icon="entypo:info-with-circle" />
  </Tooltip>
</Label>
<SelectMulti
  id={id1}
  title={labelText}
  optionsArray={primitiveOptions}
  bind:selectedValues={selectedPrimitiveOptions}
/>

<br>

<p>Value of <code>selectedPrimitiveOptions</code>: <code>{JSON.stringify(selectedPrimitiveOptions)}</code></p>

<br>

```svelte
<script lang="ts">
  import {
    Icon,
    Label, 
    SelectMulti,
    Tooltip,
  } from "$lib/client/components";

  let primitiveOptions = [
    "oversized wheels", 
    "mud tires", 
    "mud guards", 
    "trail running boards", 
    "roof rack"
  ];
  let selectedPrimitiveOptions = [];
  let labelText = "Select Your SUV Options";
  const id1 = "abc123";
</script>

<Label text={labelText} for={id1}>
  <Tooltip content={`Select as many as you want`}>
    <Icon icon="entypo:info-with-circle" />
  </Tooltip>
</Label>
<SelectMulti
  id={id1}
  title={labelText}
  optionsArray={primitiveOptions}
  bind:selectedValues={selectedPrimitiveOptions}
/>

<br>

<p>Value of <code>selectedPrimitiveOptions</code>: <code>{JSON.stringify(selectedPrimitiveOptions)}</code></p>
```

<br><br>

### `options` elements with object data types

<br>

<Label text={labelText} for={id2} />
<SelectMulti
  id={id2}
  title={labelText}
  optionsArray={objectOptions}
  bind:selectedValues={selectedObjectOptions}
/>

<br>

<p>Value of <code>selectedObjectOptions</code>: <code>{JSON.stringify(selectedObjectOptions)}</code></p>

<br>

```svelte
<script lang="ts">
  import { 
    Label, 
    SelectMulti,
  } from "$lib/client/components";

  let objectOptions = [
    { label: "Oversized Wheels", value: "oversizedWheels" },
    { label: "Mud Tires", value: "mudTires" },
    { label: "Mud Guards", value: "mudGuards" },
    { label: "Trail Running Boards", value: "trailRunningBoards" },
    { label: "Roof Rack", value: "roofRack" },
  ];
  let selectedObjectOptions = $state([objectOptions[0].value]);
  let labelText = "Select Your SUV Options";
  const id2 = "def456";
</script>

<Label text={labelText} for={id2} />
<SelectMulti
  id={id2}
  title={labelText}
  optionsArray={objectOptions}
  bind:selectedValues={selectedObjectOptions}
/>

<br>

<p>Value of <code>selectedObjectOptions</code>: <code>{JSON.stringify(selectedObjectOptions)}</code></p>
```

---

## Props

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `optionsArray` | `array` | Any array | NA | This should be an array of strings, numbers, booleans, or objects. This array will be used to populate the `<CheckboxGroup>` components in the `<SelectMulti />` component's modal. |
| `bind:selectedValues` | `array` | NA | NA | The array variable that is passed to this prop will hold the values that the user selects. This array will usually be an empty array, but if you want any values to be pre-selected, then you could include any of the values from the `optionsArray`. |
| `colors` | See <a href="/docs#colors" class="table-link">colors</a>. ||||
| `sizes` | See <a href="/docs#sizes" class="table-link">sizes</a>. ||||
| `disabled` | `boolean` | `true`, `false` | `false` | This prop will disable the `<Select />` component. |
| `...restProps` | See <a href="/docs/#rest-props" class="table-link">Rest Props</a> | | | The `restProps` for this component will come into play when you want to pass an `id` attribute to this component that is associated with a `for` attribute of a `<Label>` component. See the examples above. |

---

## Component and Accessibility Notes

* Look at this for ideas: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/.
* https://developer.mozilla.org/en-US/docs/Web/Accessibility
* https://a11y-101.com/

* This component aims to providing the usability of checkboxes instead of the default multi-select elements that are generated in HTML, as suggested by W3Schools.com:
    * Because of the different ways of selecting options (depending on the browser), and because you have to inform the user that multiple selection is available, it is more user-friendly to use checkboxes instead. See https://www.w3schools.com/tags/att_select_multiple.asp
* Use WAI-ARIA attributes to replicate the accessibility of a multi-select element:
    * `<div>` elements may use any ARIA role. (https://www.w3.org/TR/html-aria/#dfn-any-role)
    * `<select>` elements with the `multiple` attribute are used to create multi-select elements. Multi-select elements have an implicit `listbox` ARIA role, so the `<div>` in this component that is used as the select button uses a `listbox` role. (https://www.w3.org/TR/html-aria/)
        * If more than one element is selectable at a time, then include `aria-multiselectable="true"` on the element that has the `listbox` role. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
    * `<option>` element within a multi-select element:
        * Each of the `<option>` elements within a multi-select element should use an `option` ARIA role for accessibility.  (https://www.w3.org/TR/html-aria/)
        * `input type=checkbox` elements can use the `option` role. (https://www.w3.org/TR/html-aria/)
        * For elements that use the `option` role, the `aria-selected` attribute should be used to indicate the current "selected" state. Include `aria-selected` only on the selectable options (i.e. the selectable elements that have an `option` role). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
        * Authors SHOULD NOT use the `aria-checked` attribute on `input type=checkbox` elements. The HTML `checked` attribute can be used instead of the `aria-checked` attribute for `menuitemcheckbox`, `option` or `switch` roles when used on `type=checkbox`. (https://www.w3.org/TR/html-aria/)
