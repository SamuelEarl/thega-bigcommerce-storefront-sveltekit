<script lang="ts">
  import { Button, Icon, Link, Table } from "$lib/client/components";

  let isDisabled = $state(false);
</script>

# Links - `<a>` tags

A link component might not seem too helpful, but this component has a few helpers, like the `disabled` prop, that can make it easier to work with links in a consistent manner.

Also, if you want to style links to look like buttons, then this component makes it easy. You could simply use a button instead of an `<a>` tag, but that does not follow symantic HTML rules. You could wrap a button in an `<a>` tag, but that is also not ideal. Why not simply style your `<a>` tag to look like a button? That is what the `style` prop in this component does.

---

## Example usage

### Link styles

<div>
  <Link href="/docs/components/ui/links#props-bookmark">
    Link To Props
  </Link>
</div>

<br>

```svelte
<div>
	<Link href="/docs/components/ui/links#props-bookmark">Link To Props</Link>
</div>
```

<br>

### Button styles

<div>
  <Link
    href="/docs/"
    btnStyles
    target="_blank"
  >
    Docs Home
    <Icon icon="material-symbols:chevron-right" />
  </Link>
</div>

<br>

```svelte
<div>
  <Link href="/docs/" btnStyles target="_blank">
    Docs Home
    <Icon icon="material-symbols:chevron-right" />
  </Link>
</div>
```

<br>

Whatever you pass in between the opening `<Link>` tag and the closing `</Link>` tag will be displayed in the link. So if you want an icon in your button-styled link, then simply pass it in between the `<Link>` and `</Link>` tags as shown in the example above.

---

## Custom Button-styled Links

- You can create button-styled links with custom colors using the `colors` prop:<br>`colors={{ bg: string, fg: string, br: string, ol: string }}`
  - `bg` = background color
  - `fg` = foreground color (i.e. text color)
  - `br` = border color
  - `ol` = outline color
- If you pass the `colors` prop, then it will override the `variant` and `inverted` props.
- You need to specifiy each property in the `colors` prop because there are no default color values for the `colors` prop.
- You can pass anything you want to the (default) `children` snippet and the `disabledContent` snippet.

<br>

<div style="display:flex; gap: 15px;">
  <Link
    href=""
    btnStyles
    colors={{
      bg:"rgba(0, 0, 0, 0.1)", 
      fg:"red", 
      br:"red", 
      ol:"red"
    }}
    disabled={isDisabled}
  >
    Enabled Link
    <Icon icon="mdi:check" />
    {#snippet disabledContent()}
      Disabled Link
      <Icon icon="mdi:cancel" />
    {/snippet}
  </Link>

  <Button onclick={() => isDisabled = !isDisabled}>
    Click To Change Link
  </Button>
</div>

<br><br>

```svelte
<div style="display:flex; gap: 15px;">
  <Link
    href=""
    btnStyles
    colors={{
      bg: "rgba(0, 0, 0, 0.1)",
      fg: "red",
      br: "red",
      ol: "red",
    }}
    disabled={isDisabled}
  >
    Enabled Link
    <Icon icon="mdi:check" />
    {#snippet disabledContent()}
      Disabled Link
      <Icon icon="mdi:cancel" />
    {/snippet}
  </Link>

  <Button onclick={() => isDisabled = !isDisabled}>
    Click To Change Link
  </Button>
</div>
```

<br><br>

<h2 id="props-bookmark">Props</h2>

<Table
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
      "<code>href</code>",
      "<code>string</code>", 
      "Any URL string", 
      "None", 
      "The URL that the link points to."
    ],
    [
      "<code>variant</code>",
      "<code>string</code>", 
      "<code>primary</code>, <code>secondary</code>, <code>tertiary</code>", 
      "<code>primary</code>", 
      "Change the color of the link."
    ],
    [
      "<code>btnStyles</code>",
      "<code>boolean</code>", 
      "<code>true</code>, <code>false</code>",
      "<code>false</code>", 
      "If you want to use button styles, then pass <code>true</code> to this prop."
    ],
    [
      "<code>inverted</code>",
      "<code>boolean</code>", 
      "<code>true</code>, <code>false</code>", 
      "<code>false</code>", 
      "<code>false</code> will create a link that looks like a regular button. <code>true</code> will switch the background and foreground colors. NOTE: This prop only works when <code>btnStyles</code> is <code>true</code>."
    ],
    [
      "<code>colors</code>",
      {
        data: 'See <a href="/docs#colors" class="table-link">colors</a>. NOTE: This prop only works when <code>btnStyles</code> is <code>true</code>.',
        colspan: 4,
      },
    ],
    [
      "<code>sizes</code>",
      {
        data: 'See <a href="/docs#sizes" class="table-link">sizes</a>. NOTE: This prop only works when <code>btnStyles</code> is <code>true</code>.',
        colspan: 4,
      },
    ],
    [
      "<code>size</code>",
      "<code>{f:number, w:string, v:number, h:number}</code>",
      "<code>f</code>, <code>v</code>, <code>h</code>: <code>0</code> to <code>25</code> (or whatever the maximum number is that you have defined for the <code>--size-{n}</code> CSS variable in the <code>theme.css</code> file).<br><br><code>w</code>: Any font weight.",
      "<code>{f:4, w:bold, v:2, h:3}</code>",
      "You can change the button size by specifying the button's font size (<code>f</code>), font weight (<code>w</code>), vertical padding (<code>v</code>) and/or horizontal padding (<code>h</code>). Each property (<code>f</code>, <code>w</code>, <code>v</code>, <code>h</code>) is optional, so you do not have to specify all of them if you only want to change one value. NOTE: This prop only works when <code>btnStyles</code> is <code>true</code>.",
    ],
    [
      "<code>width</code>",
      "<code>string</code>", 
      "<code>auto</code>, <code>full</code>", 
      "<code>auto</code>",
      "<code>auto</code> will be wide enough to fit the contents of the button. <code>full</code> will fill the width of the button's parent element. NOTE: This prop only works when <code>btnStyles</code> is <code>true</code>.",
    ],
    [
      "<code>underline</code>",
      "<code>boolean</code>", 
      "<code>true</code>, <code>false</code>", 
      "<code>true</code>",
      "<code>true</code> will show an underline. <code>false</code> will NOT show an underline. NOTE: This prop will NOT work if you use the <code>btnStyles</code> prop.",
    ],
    [
      "<code>disabled</code>",
      "<code>boolean</code>",
      "<code>true</code>, <code>false</code>",
      "<code>false</code>",
      "There might be scenarios when you want to restrict access to a page. For example, you might want to show a navigation item that users don't have access to until they upgrade their subscription. This way, your users will be aware of the feature and you can encourage them to upgrade.",
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

<br><br>

## Snippets

<Table
  header={[
    [
      "Snippet name",
      "Default value", 
      "Description",
    ],
  ]}
  body={[
    [
      "<code>children</code>",
      "None", 
      "This is the default snippet. Whatever is passed in between the opening `<Link>` tag and the closing `</Link>` tag will be displayed in the link.",
    ],
    [
      "<code>disabledContent</code> (optional)",
      "None",
      "This is the content that will appear when the button is in a disabled state. If the <code>disabledContent</code> snippet is not provided, then the content that is passed through the <code>children</code> snippet will be used if/when the link is disabled.",
    ],
  ]}
/>
