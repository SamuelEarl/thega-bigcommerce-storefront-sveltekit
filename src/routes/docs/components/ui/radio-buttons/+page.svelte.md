<script lang="ts">
  import { RadioButton } from "$lib/client/components";

  let flavors = ["Chocolate", "Caramel", "Oreo", "Peanut Butter Cup", "Vanilla"];
  let selectedFlavor = $state("");

  let sizes = ["small", "medium", "large"];
  let selectedSize = $state("large");
</script>

# Radio Button

---

# Example Usage

<p>Select your milkshake flavor:</p>

{#each flavors as flavor}
  <div>
    <RadioButton
      bind:group={selectedFlavor} 
      value={flavor} 
      marginBottom="var(--size-4)" 
      disabled={false}
    />
  </div>
{/each}

<p>Selected flavor: {selectedFlavor}</p>


```svelte
<script lang="ts">
  import { RadioButton } from "$lib/client/components";

  let flavors = ["Chocolate", "Caramel", "Oreo", "Peanut Butter Cup", "Vanilla"];
  let selectedFlavor = $state("");
</script>


<p>Select your milkshake flavor:</p>

{#each flavors as flavor}
  <div>
    <RadioButton 
      bind:group={selectedFlavor} 
      value={flavor} 
      marginBottom="var(--size-4)" 
      disabled={false}
    />
  </div>
{/each}

<p>Selected flavor: {selectedFlavor}</p>
```

### Things to note
* Plain HTML radio buttons are grouped by using the same `name` attribute. In Svelte, you group radio buttons together with the `bind:group` option.
* The `<RadioButton>` components will display inline by default. If you want them to display as block elements (i.e. stack on top of each other), then you will need to wrap them in a block element, like a `<div>`. To create space between stacked radio buttons you can either adjust the `var(--size-5)` variable in your `theme.css` file or set a `margin-bottom` value on the `<div>` element that you use to wrap your `<RadioButton>` elements.

---

## How to set a default selection and disable radio buttons

<p>Select your milkshake size <em>(we only have large available at the moment)</em>:</p>

{#each sizes as size}
  <div>
    <RadioButton
      bind:group={selectedSize}
      value={size}
      label={size.toUpperCase()}
      disabled={size !== "large"}
    />
  </div>
{/each}

<p>Selected size: {selectedSize}</p>

```svelte
<script lang="ts">
  import { RadioButton } from "$lib/client/components";

  let sizes = ["small", "medium", "large"];
  let selectedSize = $state("large");
</script>

<p>Select your milkshake size <em>(we only have large available at the moment)</em>:</p>

{#each sizes as size}
  <div>
    <RadioButton
      bind:group={selectedSize}
      value={size}
      label={size.toUpperCase()}
      disabled={size !== "large"}
    />
  </div>
{/each}

<p>Selected size: {selectedSize}</p>
```

### Things to note

* The selected radio button will match the `selectedSize` variable. You can set the default selection by setting the variable that is bound to the `group` prop (e.g. `selectedSize` in the example above) to equal one of the options from the array that is used to loop over your radio buttons.
* The example above shows you how to disable radio buttons by passing a boolean or an expression that resolves to a boolean to the `disabled` prop.
* You can set a radio button to be both (1) `disabled` and (2) to be the default value that is selected. If that is not what you want to do, then be careful that you do not do that.

---

## Props

<div class="responsive-table">

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `bind:group` | `string` | Any string | NA | Plain HTML radio buttons are grouped by using the same `name` attribute. In Svelte, you group radio buttons together with the `bind:group` option. |
| `value` | `string` | Any string | NA | This is the value of the radio button. |
| `label` | `string` | Any string | The same text that is passed to the `value` prop. | This is the label text that will be displayed next to the radio button. If you do not pass any text to this prop, then the text from the `value` prop will be used. If you want to remove the label text, then pass an empty string (`""`) to this prop. |
| `disabled` | `boolean` | `true`, `false` | `false` | This will disable the specified radio button. |
| `marginBottom` | `string` | Any CSS margin value or CSS size variable from your `theme.css` file. | `var(--size-4)` | This prop will set the default `margin-bottom` for the radio button.<br><br>The default value for all radio buttons can be changed in the `theme.css` file. |

</div>

<br>

## Event Forwarding

<div class="responsive-table">

| Event | Description |
| ----- | ----------- |
| `onchange` | This component forwards the `change` event. You can attach `onchange={handlerFunction}` to your `<RadioButton>` components, which will call an event handler named `handlerFunction` when a user selects a radio button. |
| `oninput` | This component forwards the `input` event. You can attach `oninput={handlerFunction}` to your `<RadioButton>` components, which will call an event handler named `handlerFunction` when a user selects a radio button. |

</div>
