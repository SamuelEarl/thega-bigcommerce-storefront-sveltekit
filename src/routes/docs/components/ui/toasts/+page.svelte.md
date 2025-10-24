<script lang="ts">
  import { 
    Button,
    setToastMsg,
  } from "$lib/client/components";
</script>

# Toast (notification pane)

The `<Toast>` component has two parts:

1. The actual `<Toast>` component (i.e. the notification pane).
2. The `setToastMsg` function. The object that you pass to the `setToastMsg` function has two properties:
    1. `type`: The type of notification pane that you want to show to your users.
    2. `msg`: The message that will be shown when the toast is displayed.

---

## Example Usage

*NOTE: Each of these toasts stays open for 7 seconds and will automatically close after that. See the "Variables" heading below to find out how to adjust the `duration`.*

<Button
  colors={{
    bg: "var(--info-bg)",
    fg: "var(--white)",
    br: "var(--info-bg)",
    ol: "var(--info-bg)",
  }}
  onclick={() => {
    setToastMsg({
      type: "info",
      msg: 'The "info" toast type will show a notification to your users that is intended for informational purposes.'
    });
  }}
>
  Click to show an "info" notification
</Button>

<br>

**Step 1**: Import the `<Toast>` component into your `/src/routes/+layout.svelte` component so you can show notifications to your users.

*`/src/routes/+layout.svelte`*
```svelte
<script>
  import { Toast } from "$lib/client/components";
</script>

<Toast />
```

**Step 2**: Import the `setToastMsg` function into any component where you want to trigger a toast that will appear for your users.

*`/src/routes/login.svelte`*
```svelte
<script>
  import { Button, setToastMsg } from "$lib/client/components";
</script>

<Button
  colors={{
    bg: "var(--info-bg)",
    fg: "var(--white)",
    br: "var(--info-bg)",
    ol: "var(--info-bg)",
  }}
  onclick={() => {
    setToastMsg({
      type: "info",
      msg: 'The "info" toast type will show a notification to your users that is intended for informational purposes.'
    });
  }}
>
  Click to show an "info" notification
</Button>
```

---

<Button
  colors={{
    bg: "var(--success-bg)",
    fg: "var(--white)",
    br: "var(--success-bg)",
    ol: "var(--success-bg)",
  }}
  onclick={() => {
    setToastMsg({
      type: "success", 
      msg: 'The "success" toast type is meant to show a notification to your users when an operation executed successfully.',
    });
  }}
>
  Click to show a "success" notification
</Button>

<br>

```svelte
<Button
  colors={{
    bg: "var(--success-bg)",
    fg: "var(--white)",
    br: "var(--success-bg)",
    ol: "var(--success-bg)",
  }}
  onclick={() => {
    setToastMsg({
      type: "success", 
      msg: 'The "success" toast type is meant to show a notification to your users when an operation executed successfully.',
    });
  }}
>
  Click to show a "success" notification
</Button>
```

---

<Button
  colors={{
    bg: "var(--warning-bg)",
    fg: "var(--text-color)",
    br: "var(--warning-bg)",
    ol: "var(--warning-bg)",
  }}
  onclick={() => {
    setToastMsg({
      type: "warning", 
      msg: 'The "warning" toast type is meant to show a notification to your users when you need to warn them about something.',
    });
  }}
>
  Click to show a "warning" notification
</Button>

<br>

```svelte
<Button
  colors={{
    bg: "var(--warning-bg)",
    fg: "var(--text-color)",
    br: "var(--warning-bg)",
    ol: "var(--warning-bg)",
  }}
  onclick={() => {
    setToastMsg({
      type: "warning", 
      msg: 'The "warning" toast type is meant to show a notification to your users when you need to warn them about something.',
    });
  }}
>
  Click to show a "warning" notification
</Button>
```

---

<Button
  colors={{
    bg: "var(--error-bg)",
    fg: "var(--white)",
    br: "var(--error-bg)",
    ol: "var(--error-bg)",
  }}
  onclick={() => {
    setToastMsg({
      type: "error", 
      msg: 'The "error" toast type is meant to show a notification to your users when an error occurred that you want to notify them about.'
    });
  }}
>
  Click to show an "error" notification
</Button>

<br>

```svelte
<Button
  colors={{
    bg: "var(--error-bg)",
    fg: "var(--white)",
    br: "var(--error-bg)",
    ol: "var(--error-bg)",
  }}
  onclick={() => {
    setToastMsg({
      type: "error", 
      msg: 'The "error" toast type is meant to show a notification to your users when an error occurred that you want to notify them about.'
    });
  }}
>
  Click to show an "error" notification
</Button>
```

---

## Variables

This component does not take any props, but you can change the `duration` variable inside the component to adjust the amount of time that a toast stays open.

| Variable name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `duration` | `number` | Any number or `Infinity` | `7000` | This variable is used to set the length of time that the toasts will be displayed. If the duration is `Infinity`, then the toast will not automatically close and the user will have to close the toast by clicking the "x". If the duration is a number other than `Infinity`, then the toast will clear after the `duration` has elapsed. |

---

## `setToastMsg()`

The examples above showed how you can call `setToastMsg()` when a button is clicked, but you can call `setToastMsg()` from anywhere. Here are just a few examples of where you might call `setToastMsg()`:

* If a user has unread messages in their account, then you might want to show an `info` notification. In this case you might call `setToastMsg()` in an `onMount()` hook after the user logs in.
* After a user updates something in their profile or account, then you might want to show a `success` notification. In this case you might call `setToastMsg()` when you get a successful response from an API call.
* If a user is approaching the end of a subscription, then you might want to show a `warning` notification. In this case you might call `setToastMsg()` in an `onMount()` hook after the user logs in.
* If an error occurs during login, then you might want to display a user-friendly `error` message to your users. In this case you might call `setToastMsg()` from inside a `catch` block.
