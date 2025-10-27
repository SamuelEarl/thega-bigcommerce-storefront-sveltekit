<script lang="ts">
  import { 
    Button, 
    Icon,
    Input,
    Label,
    Select, 
    TabsContainer, 
    TabBar, 
    Tab, 
    TabPanel, 
    Table, 
    Textarea, 
    Tooltip 
  } from "$lib/client/components";

  let saving = $state(false);

  let name = $state("");
  let subject = $state("");
  let email = $state("");
  let message = $state("");

  // Not an actual form validation function.
  let fieldsAreNotFilled = $derived.by(() => {
    let isInvalid = true;
    if (name && subject && email && message) {
      isInvalid = false;
    }
    return isInvalid;
  });

  function handleSubmit() {
    event.preventDefault();
    saving = true;
    setTimeout(() => {
      saving = false;
      name = "";
      subject = "";
      email = "";
      message = "";
    }, 3000);
  }

  const variants = [
    "primary",
    "secondary",
    "tertiary",
  ];
  let selectedVariant = $state("primary");
  let selectedInverted = $state(false);

  function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  const sizeOptions = range(0, 25);
  let selectedFontSize = $state(4);
  let selectedVPadding = $state(2);
  let selectedHPadding = $state(3);
  let selectedBtnWidth = $state("auto");

  function handleSave() {
    saving = true;
    setTimeout(() => saving = false, 3000);
  }

  let showInteractiveButtons = $state(true);

  function handleRefreshInteractiveBtns() {
    showInteractiveButtons = false;
    setTimeout(() => {
      showInteractiveButtons = true;
    }, 0);
  }
</script>

# Buttons

These buttons provide a lot of styling flexibility out of the box, especially with the `colors` and `sizes` props. Buttons are probably the most used component in a typical web app. You will probably need to be able to change the colors and sizes of your buttons depending on where your buttons are used. This button component allows you to do that easily.

---

## Example Usage

<Button
	type="button"
	variant="primary"
	sizes={{fs:4, pv:2, ph:3}}
	inverted={false}
	width="auto"
	disabled={saving}
	icon="material-symbols:save-outline-sharp"
	disabledIconShouldSpin={true}
	iconSide="right"
	onclick={handleSave}
>
	Save
	{#snippet disabledContent()}
		Saving
	{/snippet}
</Button>

<br>

```svelte
<script>
	import { Button } from "$lib/client/components";

	let saving = $state(false);

	function handleSave() {
    saving = true;
    setTimeout(() => saving = false, 3000);
  }
</script>

<Button
	type="button"
	variant="primary"
	sizes={{fs:4, pv:2, ph:3}}
	inverted={false}
	width="auto"
	disabled={saving}
	icon="material-symbols:save-outline-sharp"
	disabledIconShouldSpin={true}
	iconSide="right"
	onclick={handleSave}
>
	Save
	{#snippet disabledContent()}
		Saving
	{/snippet}
</Button>
```

---

## Interactive Example

<div class="interactive-example">
  <div class="light-bg">
    {#if showInteractiveButtons}
      <Button
        variant={selectedVariant}
        inverted={selectedInverted}
        sizes={{fs:selectedFontSize, pv:selectedVPadding, ph:selectedHPadding}}
        width={selectedBtnWidth}
        disabled={saving}
        icon="material-symbols:save-outline-sharp"
        disabledIcon="gg:spinner-two-alt"
        disabledIconShouldSpin={true}
        onclick={handleSave}
      >
        Save Data
        {#snippet disabledContent()}
          Saving Data
        {/snippet}
      </Button>
    {/if}
  </div>

  <div class="dark-bg">
    {#if showInteractiveButtons}
      <Button
        variant={selectedVariant}
        inverted={selectedInverted}
        sizes={{fs:selectedFontSize, pv:selectedVPadding, ph:selectedHPadding}}
        width={selectedBtnWidth}
        disabled={saving}
        icon="material-symbols:save-outline-sharp"
        disabledIcon="gg:spinner-two-alt"
        disabledIconShouldSpin={true}
        onclick={handleSave}
      >
        Save Data
        {#snippet disabledContent()}
          Saving Data
        {/snippet}
      </Button>
    {/if}
  </div>
</div>

<br>

<div class="grid">
  <div>
    <Label text="Variant">
      <Select
        options={variants}
        bind:value={selectedVariant}
        onchange={handleRefreshInteractiveBtns}
      />
    </Label>
  </div>
  <div>
    <Label text="Inverted">
      <Select
        options={[true, false]}
        bind:value={selectedInverted}
        onchange={handleRefreshInteractiveBtns}
      />
    </Label>
  </div>
  <div>
    <Label text="Width">
      <Select
        options={["auto","full"]}
        bind:value={selectedBtnWidth}
        onchange={handleRefreshInteractiveBtns}
      />
    </Label>
  </div>
  <div>
    <Label text="Font Size">
      <Select
        options={sizeOptions}
        bind:value={selectedFontSize}
        onchange={handleRefreshInteractiveBtns}
      />
    </Label>
  </div>
  <div>
    <Label text="Vertical Padding">
      <Select
        options={sizeOptions}
        bind:value={selectedVPadding}
        onchange={handleRefreshInteractiveBtns}
      />
    </Label>
  </div>
  <div>
    <Label text="Horizontal Padding">
      <Select
        options={sizeOptions}
        bind:value={selectedHPadding}
        onchange={handleRefreshInteractiveBtns}
      />
    </Label>
  </div>
</div>

---

## How to use `<Button>` as the submit button in a `<form>`

<form method="POST" onsubmit={handleSubmit}>
  <div class="form-field">
    <Label text="Your Name">
      <Input type="text" bind:value={name} />
    </Label>
  </div>
  <div class="form-field">
    <Label text="Subject">
      <Input type="text" bind:value={subject} />
    </Label>
  </div>
  <div class="form-field">
    <Label text="Your Email Address">
      <Input type="text" bind:value={email} />
    </Label>
  </div>
  <div class="form-field">
    <Label text="Message">
      <Textarea bind:value={message} rows="5" />
    </Label>
  </div>
  <div class="form-field">
    <Button
      type="submit" 
      disabled={saving}
      formIsInvalid={fieldsAreNotFilled}
      icon="material-symbols:save-outline-sharp"
    >
      Save Form Data
      {#snippet disabledContent()}
        Saving Form Data
      {/snippet}
    </Button>
  </div>
</form>

<br><br>

```svelte
<script>
	let saving = $state(false);
	let name = $state("");
	let subject = $state("");
	let email = $state("");
	let message = $state("");

	// Not an actual form validation function.
	let fieldsAreNotFilled = $derived.by(() => {
		let isInvalid = true;
		if (name && subject && email && message) {
			isInvalid = false;
		}
		return isInvalid;
	});

	async function handleSubmit(event) {
		try {
			event.preventDefault();
			saving = true;

			// Custom event listener goes here.
			// See https://svelte.dev/docs/kit/form-actions#Progressive-enhancement-Custom-event-listener
		} catch (err) {
			console.error(err);
		} finally {
			saving = false;
			name = "";
			subject = "";
			email = "";
			message = "";
		}
	}
</script>

<form method="POST" onsubmit={handleSubmit}>
  <div class="form-field">
    <Label text="Your Name">
      <Input type="text" bind:value={name} />
    </Label>
  </div>
  <div class="form-field">
    <Label text="Subject">
      <Input type="text" bind:value={subject} />
    </Label>
  </div>
  <div class="form-field">
    <Label text="Your Email Address">
      <Input type="text" bind:value={email} />
    </Label>
  </div>
  <div class="form-field">
    <Label text="Message">
      <Textarea bind:value={message} rows="5" />
    </Label>
  </div>
  <div class="form-field">
    <Button
      type="submit" 
      disabled={saving}
      formIsInvalid={fieldsAreNotFilled}
      icon="material-symbols:save-outline-sharp"
    >
      Save Form Data
      {#snippet disabledContent()}
        Saving Form Data
      {/snippet}
    </Button>
  </div>
</form>
```

---

## Icon Buttons

You can create buttons that have only icons (i.e. no text). Do not pass any snippets in between the opening `<Button>` and closing `</Button>` tags and provide the `icon` and/or `disabledIcon` props.

<Button
  icon="material-symbols:save-outline-sharp"
  sizes={{fs:10, pv:2, ph:2}}
  title="Save File"
  disabled={saving}
  onclick={handleSave}  
/>

<br>

```svelte
<script>
	let saving = false;

	function handleSave() {
		saving = true;
		setTimeout(() => (saving = false), 3000);
	}
</script>

<Button
	icon="material-symbols:save-outline-sharp"
	sizes={{ fs:10, pv:2, ph:2 }}
	title="Save File"
	disabled={saving}
	onclick={handleSave}
/>
```

---

## Custom Colors

- You can create buttons with custom colors using the `colors` prop:<br>`colors={{ bg: string, fg: string, br: string, ol: string }}`
  - `bg` = background color
  - `fg` = foreground color (i.e. text color)
  - `br` = border color
  - `ol` = outline color
- You need to specifiy each property in the `colors` prop because there are no default color values for the `colors` prop.
- If you pass the `colors` prop, then it will override the `variant` and `inverted` props.

<br>

<Button
	colors={{
		bg: "transparent",
		fg: "var(--dark-red)",
		br: "var(--dark-red)",
		ol: "var(--dark-red)",
	}}
	disabled={saving}
	icon="material-symbols:save-outline-sharp"
	disabledIconShouldSpin={true}
	iconSide="right"
	onclick={handleSave}
>
	Save
	{#snippet disabledContent()}
		Saving
	{/snippet}
</Button>

<br>

```svelte
<script>
	import { Button } from "$lib/client/components";

	let saving = $state(false);

	function handleSave() {
    saving = true;
    setTimeout(() => saving = false, 3000);
  }
</script>

<Button
	colors={{
		bg: "transparent",
		fg: "var(--dark-red)",
		br: "var(--dark-red)",
		ol: "var(--dark-red)",
	}}
	disabled={saving}
	icon="material-symbols:save-outline-sharp"
	disabledIconShouldSpin={true}
	iconSide="right"
	onclick={handleSave}
>
	Save
	{#snippet disabledContent()}
		Saving
	{/snippet}
</Button>
```

---

## Props

<Table
  border={false}
  header={[
    [
      "Prop name",
      "Type", 
      "Possible values",
      "Default value", 
      "Description",
    ],
  ]}
  body={[
    [
      "<code>type</code>",
      "<code>string</code>",
      "<code>button</code>, <code>submit</code>, <code>reset</code>",
      "<code>button</code>",
      "Specify the type of button.",
    ],
    [
      "<code>variant</code>",
      "<code>string</code>",
      "<code>primary</code>, <code>secondary</code>, <code>tertiary</code>",
      "<code>primary</code>",
      "Specify the button styles.",
    ],
    [
      "<code>inverted</code>",
      "<code>boolean</code>",
      "<code>true</code>, <code>false</code>",
      "<code>false</code>",
      "<code>false</code> will create a regular button. <code>true</code> will switch the background and foreground colors.",
    ],
    [
      "<code>colors</code>",
      {
        data: 'See <a href="/docs#colors" class="table-link">colors</a>.',
        colspan: 4,
      },
    ],
    [
      "<code>sizes</code>",
      {
        data: 'See <a href="/docs#sizes" class="table-link">sizes</a>.',
        colspan: 4,
      },
    ],
    [
      "<code>width</code>",
      "<code>string</code>",
      "<code>auto</code>, <code>full</code>",
      "<code>auto</code>",
      "<code>auto</code> will be wide enough to fit the contents of the button. <code>full</code> will fill the width of the button's parent element.",
    ],
    [
      "<code>disabled</code>",
      "<code>boolean</code>",
      "<code>true</code>, <code>false</code>",
      "<code>false</code>",
      "This will disable the button and display the <code>disabledContent</code> and the <code>disabledIcon</code> (if it has been set).",
    ],
    [
      "<code>formIsInvalid</code>",
      "<code>boolean</code>",
      "<code>true</code>, <code>false</code>",
      "<code>false</code>",
      'This only applies to <code>submit</code> buttons (<code>&lt;Button type="submit" /&gt;</code>). If <code>formIsInvalid=true</code>, then the button will be disabled, but it will <em>not</em> show the disabled text or icon. It will simply prevent the user from submitting the form.',
    ],
    [
      "<code>icon</code>",
      "<code>string</code>",
      "Any icon name from the Iconify library.",
      '<code>""</code> (no icon)',
      "If either the <code>icon</code> or <code>disabledIcon</code> is set to an empty string, then no button icons or disabled button icons will be displayed with the button. This is intentional by design because it could look strange if you have a button icon during a regular state and then no icon during a disabled state or vice versa. If you don't want icons on your buttons, but would like to change the button text when a button is disabled, then refer to the <code>disabledContent</code> snippet below.",
    ],
    [
      "<code>disabledIcon</code>",
      "<code>string</code>",
      "See <code>icon</code>",
      "<code>gg:spinner-two-alt</code>",
      "See <code>icon</code>",
    ],
    [
      "<code>disabledIconShouldSpin</code>",
      "<code>boolean</code>",
      "<code>true</code>, <code>false</code>",
      "<code>true</code>",
      "A value of <code>true</code> will cause the icon on a disabled button to spin which would provide user feedback for loading states (e.g. saving data, loading page content). A value of <code>false</code> will prevent the icon on a disabled button from spinning.",
    ],
    [
      "<code>iconSide</code>",
      "<code>string</code>",
      "<code>left</code>, <code>right</code>",
      "<code>left</code>",
      "This sets the icon to either the left or right side of the button.",
    ],
    [
      "<code>rotateIcon</code> (optional)",
      "<code>string</code>",
      "Any number with <code>deg</code> appended to the end.",
      "<code>0deg</code> (i.e. no rotation)",
      "You can pass a rotate value to this prop and the icon will be rotated according to the value you pass. For example, <code>45deg</code> will rotate the icon 45 degrees.",
    ],
    [
      "<code>rotateDisabledIcon</code> (optional)",
      "<code>string</code>",
      "See <code>rotateIcon</code>",
      "See <code>rotateIcon</code>",
      "This will rotate the disabled button icon (<code>disabledIcon</code>). See <code>rotateIcon</code> for more details. This prop would probably only be useful if you set <code>disabledIconShouldSpin</code> to <code>false</code>.",
    ],
    [
      "<code>...restProps</code>",
      {
        data: 'See <a href="/docs/#rest-props" class="table-link">Rest Props</a>.',
        colspan: 4,
      },
    ],
  ]}
/>

---

<br><br>

## Snippets

<div class="responsive-table">

| Snippet name                 | Default value | Description                                                                                                                                                                                                                                |
| ---------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `children` (optional)        | None          | This is the default snippet. Whatever is passed in between the opening `<Button>` tag and the closing `</Button>` tag will be displayed in the button.                                                                                     |
| `disabledContent` (optional) | None          | This is the content that will appear when the button is in a disabled state. If the `disabledContent` snippet is not provided, then the content that is passed through the `children` snippet will be used if/when the button is disabled. |

</div>

<br><br>

## Event Forwarding

<div class="responsive-table">

| Event     | Description                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------- |
| `onclick` | This component forwards the `click` event, so you can call an event handler when a user clicks this `<Button>` component. |

</div>

<style>
  @media (--xs-up) {
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .form-field {
      margin-bottom: 15px;
    }

    .interactive-example {
      display: flex;
      flex-direction: column;

      & div {
        flex: 1;
        min-height: 150px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        padding: 20px;
      }

      & .light-bg {
        background-color: var(--neutral-2);
        border-radius: var(--radius) 0 0 var(--radius);
      }

      & .dark-bg {
        background-color: var(--neutral-11);
        border-radius: 0 var(--radius) var(--radius) 0;
      }
    }
  }

  @media (--lg-up) {
    .grid {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .interactive-example {
      flex-direction: row;
    }
  }
</style>
