<script lang="ts">
  import { Icon, Link } from "$lib/client/components";
</script>

# Icons

This component uses CSS icons from Iconify. For details see the following pages:

* <Link href="https://github.com/sveltejs/kit/discussions/13455#discussioncomment-10592884">Why use CSS icons</Link>
* <Link href="https://svelte.dev/docs/kit/icons">Svelte Icons</Link>
* <Link href="https://iconify.design/docs/usage/css/">How to use icons in CSS</Link>
* <Link href="https://iconify.design/docs/usage/css/utils/">Generate CSS for icons with Iconify Utils</Link>

---

## Example Usage

To use Iconify icons in HTML, pass the `icon-set:icon-name` string (from Iconify) to this `<Icon>` component.

<Icon icon="material-symbols:save-outline-sharp" style="font-size: 100px;" />

<br>

```svelte
<script lang="ts">
  import { Icon } from "$lib/client/components";
</script>

<Icon icon="material-symbols:save-outline-sharp" style="font-size: 100px;" />
```

### IMPORTANT

You have to update the `src/lib/client/assets/styles/icons.css` file with any new icons that you want to use.

This is how you update the `icons.css` file:

1. Add the icon set and icon name to the `icons` object in the `generate-css-icons.js` file (in the root directory).
2. Run `node generate-css-icons.js` or `make generate-css-icons` from the root directory. This will overwrite the `src/lib/client/assets/styles/icons.css` file with the latest CSS code.

<br>
<br>

## Icons without this component

If you don't want to use this component or you need to use the `<span>` version to produce your icons, then you can do that by passing two classes to a `<span>` element:

1. The class name for the icon set.
2. The class name for the icon.

**Syntax:**

```
<span class="icon--<icon-set> icon--<icon-set>--<icon-name>" style="font-size: 100px;"></span>
```

**Example:**

```
<span class="icon--material-symbols icon--material-symbols--save-outline-sharp" style="font-size: 100px;"></span>
```

<span class="icon--material-symbols icon--material-symbols--save-outline-sharp" style="font-size: 100px;"></span>

<br>

## Props

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `icon` | `string` | Any `icon-set:icon-name` string from Iconfiy | None | This prop will specify the icon that will be displayed. |
| `style` | `string` | Any CSS style string | `""` | This prop allows you to style the icons. You will probably use this mostly to pass `font-size` and maybe `color` styles to this component. |
