<script lang="ts">
  import { Skeleton, Spinner } from "$lib/client/components";
</script>

# Loaders

Skeletons and spinners can be used to show loading states while data is being retrieved from the backend.

---

## Skeletons

By default skeleton components will be a rectangular shape and they will take up the available space. But you can specify `width` and `height` props so they will only take up a specific amount of space and you can also pass a `circle` prop to make your skeleton a circle instead of the default rectangle shape. Skeletons will inherit the `border-radius` style from the `--radius` value that you set in the `theme.css` file, unless you pass the `circle` prop. NOTE: To create a circle, the skeleton's `width` and `height` properties have to be equal to each other.

### Example Usage

#### Rectangle (default)

<div class="wrapper">
  <Skeleton />
</div>

<br>

```
<div class="wrapper">
  <Skeleton />
</div>

<style>
  .wrapper {
    width: 50%;
    height: 100px;
  }
</style>
```

---

#### Circle

<Skeleton width="125px" height="125px" circle />

<br>

```
<Skeleton width="125px" height="125px" circle />
```

---

#### Page Layout

<div class="page-layout">
  <h1><Skeleton height="60px" /></h1>
  <div style="display: flex; gap: 20px;">
    <div>
      <Skeleton width="90px" height="90px" circle />
    </div>
    <div style="flex:1">
      <p><Skeleton height="20px" /></p>
      <p><Skeleton height="20px" /></p>
      <p><Skeleton height="20px" /></p>
    </div>
  </div>
  <p><Skeleton height="20px" /></p>
  <p><Skeleton height="20px" /></p>
  <p><Skeleton height="20px" /></p>
</div>

<br>

```
<div class="page-layout">
  <h1><Skeleton height="60px" /></h1>
  <div style="display: flex; gap: 20px;">
    <div>
      <Skeleton width="90px" height="90px" circle />
    </div>
    <div style="flex:1">
      <p><Skeleton height="20px" /></p>
      <p><Skeleton height="20px" /></p>
      <p><Skeleton height="20px" /></p>
    </div>
  </div>
  <p><Skeleton height="20px" /></p>
  <p><Skeleton height="20px" /></p>
  <p><Skeleton height="20px" /></p>
</div>
```

<br>

---

## Spinners

Spinners can accept the following props: `spinnerSize`, `msg`, `msgFontSize`, `msgIsAboveSpinner`. Spinners are centered by default. If a message is passed to this component, then the message will appear below the spinner by default. You can pass the `msgIsAboveSpinner` prop to position the message above the spinner.

### Example Usage

#### Spinner Only

<Spinner spinnerSize="30" />

```
<Spinner spinnerSize="30" />
```

---

#### Spinner + Message

<Spinner msg="Loading..." />

```
<Spinner msg="Loading..." />
```

---

#### Large Message Above Spinner

<Spinner
  msg="Large Loading Message"
  msgFontSize="5rem"
  msgIsAboveSpinner
/>

```
<Spinner
  msg="Large Loading Message"
  msgFontSize="5rem"
  msgIsAboveSpinner
/>
```


<style>
  .wrapper {
    width: 50%;
    height: 100px;
  }
</style>
