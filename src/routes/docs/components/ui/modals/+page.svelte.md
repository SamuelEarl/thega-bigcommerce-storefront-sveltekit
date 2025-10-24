<script lang="ts">
  import { Button, Checkbox, Input, Modal } from "$lib/client/components";
  import LoginForm from "./LoginForm.svelte";

  let showModal = $state(false);
  let showModalBody = $state(false);

  let showLoginModal = $state(false);
  let loggingIn = $state(false);
  let loginEmail = $state("");
  
  let showNewsletterModal = $state(false);
  let newsletterEmail = $state("");
  let signingUp = $state(false);
  let savingEdits = $state(false);
  let enableScrollingBody = $state(true);

  function handleSaveData() {
    savingEdits = true;
    setTimeout(() => savingEdits = false, 3000);
  }

  async function demoLogin(event) {
    try {
      event.preventDefault();
      loggingIn = true;

      // At this point you would send the loginEmail (and any other login form data) to the backend through a fetch request.

      // Login logic would go here instead of a setTimeout function.
      setTimeout(() => {
        // Reset the login back to false so the modal won't be disabled when it is opened again.
        loggingIn = false;
        // Hide the modal.
        showLoginModal = false;
        // Clear the form.
        loginEmail = "";
      }, 3000);
    }
    catch (err) {
      console.error("Login Error:", err);
    }
  }
</script>


# Modal (popup window)

---

<Button icon="" onclick={() => showModal = true}>Click To Show Modal</Button>
<br>
<Checkbox bind:checked={enableScrollingBody} label="Enable `scrollingBody` prop" />

{#if showModal}
  <Modal
    title="Modal Title"
    scrollingBody={enableScrollingBody}
    disabled={savingEdits}
    onCloseModalCallback={() => showModal = false}
  >
    {#snippet modalBody()}
      <div class="modal-body">
        <p>Modal body text goes here...</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    {/snippet}
    {#snippet modalFooterLeft()}
      <Button
        icon="ion:save-sharp"
        disabled={savingEdits} 
        onclick={handleSaveData}
      >
        Save Data
        {#snippet btnTextDisabled()}
          Saving Data...
        {/snippet}
      </Button>
      <Button>Left Footer Button</Button>
    {/snippet}
    {#snippet modalFooterRight()}
      <Button>Right Footer Button</Button>
      <Button icon="fa-solid:times" disabled={savingEdits} onclick={() => showModal = false}>Close</Button>
    {/snippet}
  </Modal>
{/if}

```svelte
<script>
  import { Button, Checkbox, Modal } from "$lib/client/components";

  let showModal = $state(false);
  let savingEdits = $state(false);
  let enableScrollingBody = $state(true);

  function handleSaveData() {
    savingEdits = true;
    setTimeout(() => savingEdits = false, 3000);
  }
</script>

<Button icon="" onclick={() => showModal = true}>Click To Show Modal</Button>
<br>
<Checkbox bind:checked={enableScrollingBody} label="Enable `scrollingBody` prop" />

{#if showModal}
  <Modal
    title="Modal Title"
    scrollingBody={enableScrollingBody}
    disabled={savingEdits}
    onCloseModalCallback={() => showModal = false}
  >
    {#snippet modalBody()}
      <div class="modal-body">
        <div>Modal body text goes here...</div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </div>
    {/snippet}
    {#snippet modalFooterLeft()}
      <Button
        icon="ion:save-sharp"
        disabled={savingEdits} 
        onclick={handleSaveData}
      >
        Save Data
        {#snippet btnTextDisabled()}
          Saving Data...
        {/snippet}
      </Button>
      <Button>Left Footer Button</Button>
    {/snippet}
    {#snippet modalFooterRight()}
      <Button>Right Footer Button</Button>
      <Button icon="fa-solid:times" disabled={savingEdits} onclick={() => showModal = false}>Close</Button>
    {/snippet}
  </Modal>
{/if}

<style>
  @media (--xs-up) {
    .modal-body {
      padding: 5px;
    }
  }

  @media (--lg-up) {
    .modal-body {
      padding: 15px;
    }
  }
</style>
```

---

## Exclude Modal Header or Footer
You can exclude the modal header by leaving out the `title` prop.

You can exclude the modal footer by leaving out the `modalFooterLeft` and `modalFooterRight` snippets.

<Button icon="" onclick={() => showModalBody = true}>Click To Show Modal Without Header or Footer</Button>
<br>

{#if showModalBody}
  <!-- No `title` prop -->
  <Modal
    disabled={savingEdits}
    onCloseModalCallback={() => showModalBody = false}
  >
    {#snippet modalBody()}
      <div style="padding: 10px;">
        <div>This modal only has a body (i.e. there is no header or footer included).</div>
        <h3>I can put header tags inside this modal</h3>
        <p id="custom-p">I can put any custom styled content inside this modal</p>
      </div>
    {/snippet}
    <!-- No modalFooterLeft or modalFooterRight snippets -->
  </Modal>
{/if}

```svelte
<script>
  import { Button, Modal } from "$lib/client/components";

  let showModalBody = $state(false);
</script>

<Button icon="" onclick={() => showModalBody = true}>Click To Show Modal Without Header or Footer</Button>
<br>

{#if showModalBody}
  <!-- No `title` prop -->
  <Modal
    disabled={savingEdits}
    onCloseModalCallback={() => showModalBody = false}
  >
    {#snippet modalBody()}
      <div style="padding: 10px;">
        <div>This modal only has a body (i.e. there is no header or footer included).</div>
        <h3>I can put header tags inside this modal</h3>
        <p id="custom-p">I can put any custom styled content inside this modal</p>
      </div>
    {/snippet}
    <!-- No `modalFooterLeft` or `modalFooterRight` snippets -->
  </Modal>
{/if}

<style>
  #custom-p {
    font-size: 2rem;
    line-height: 2rem;
  }
</style>
```

<br>

You can put almost anything inside of a modal body:

<Button onclick={() => showLoginModal = true}>Show Login Modal</Button>

<br>

{#if showLoginModal}
  <Modal
    scrollingBody={false}
    showCloseBtn={false}
    onCloseModalCallback={() => showLoginModal = false}
    modalWidth="100%"
  >
    {#snippet modalBody()}
      <LoginForm 
        {demoLogin}
        cancel={() => showLoginModal = false}
        bind:loginEmail={loginEmail}
        disabled={loggingIn}
      />
    {/snippet}
  </Modal>
{/if}

```svelte
<script>
  import { Button, Modal } from "$lib/client/components";

  let showLoginModal = $state(false);
  let loggingIn = $state(false);
  let loginEmail = $state("");

  async function demoLogin(event) {
    try {
      event.preventDefault();
      loggingIn = true;

      // At this point you would send the loginEmail (and any other login form data) to the backend through a fetch request or through form actions.

      // Login logic would go here instead of a setTimeout function.
      setTimeout(() => {
        // Reset the login back to false so the modal won't be disabled when it is opened again.
        loggingIn = false;
        // Hide the modal.
        showLoginModal = false;
        // Clear the form.
        loginEmail = "";
      }, 3000);
    }
    catch (err) {
      console.error("Login Error:", err);
    }
  }
</script>

<Button onclick={() => showLoginModal = true}>Show Login Modal</Button>
<br>

{#if showLoginModal}
  <Modal
    scrollingBody={false}
    showCloseBtn={false}
    onCloseModalCallback={() => showLoginModal = false}
    modalWidth="100%"
  >
    {#snippet modalBody()}
      <LoginForm 
        {demoLogin}
        cancel={() => showLoginModal = false}
        bind:loginEmail={loginEmail}
        disabled={loggingIn}
      />
    {/snippet}
  </Modal>
{/if}
```

---

## Set the focus element

<Button onclick={() => showNewsletterModal = true}>Show Newsletter Modal</Button>
<br>

{#if showNewsletterModal}
  <Modal
    scrollingBody={false}
    focusElement="newsletter-email"
    disabled={signingUp}
    onCloseModalCallback={() => showNewsletterModal = false}
  >
    {#snippet modalBody()}
      <div style="height: 400px; padding: 50px;">
        <h1>Sign up for our newsletter!</h1>
        <br>
        <div>
          <Input
            id="newsletter-email"
            type="text"
            bind:value={newsletterEmail}
            disabled={signingUp}
            label="Enter your email address"
          />
        </div>
        <br>
        <div>
          <Button
            width="full"
            disabled={signingUp}
            onclick={() => {
              signingUp = true;
              setTimeout(() => {
                signingUp = false;
                showNewsletterModal = false;
              }, 2000);
            }}
          >
            Sign Up
          </Button>
        </div>
        <br>
        <div style="text-align: center;">
          <button
            class="link-styles primary"
            disabled={signingUp}
            onclick={() => showNewsletterModal = false}
          >
            Cancel
          </button>
        </div>
      </div>
    {/snippet}
  </Modal>
{/if}

You can set the element that should receive focus when the modal opens:

1. Give the focus element an `id` attribute.
2. Pass the value of that `id` attribute to the modal's `focusElement` prop.

```svelte
<script>
  import { Button, Input, Modal } from "$lib/client/components";

  let showNewsletterModal = $state(false);
  let newsletterEmail = $state("");
  let signingUp = $state(false);
</script>

<Button onclick={() => showNewsletterModal = true}>Show Newsletter Modal</Button>
<br>

{#if showNewsletterModal}
  <Modal
    scrollingBody={false}
    focusElement="newsletter-email"
    disabled={signingUp}
    onCloseModalCallback={() => showNewsletterModal = false}
  >
    {#snippet modalBody()}
      <div style="height: 400px; padding: 50px;">
        <h1>Sign up for our newsletter!</h1>
        <br>
        <div>
          <Input
            id="newsletter-email"
            type="text"
            bind:value={newsletterEmail}
            disabled={signingUp}
            label="Enter your email address"
          />
        </div>
        <br>
        <div>
          <Button
            width="full"
            disabled={signingUp}
            onclick={() => {
              signingUp = true;
              setTimeout(() => {
                signingUp = false;
                showNewsletterModal = false;
              }, 2000);
            }}
          >
            Sign Up
          </Button>
        </div>
        <br>
        <div style="color: var(--primary-bg); text-align: center;">
          <button
            class="link-styles"
            disabled={signingUp}
            onclick={() => showNewsletterModal = false}
          >
            Cancel
          </button>
        </div>
      </div>
    {/snippet}
  </Modal>
{/if}
```

---

## Constrain the height of the modal

By default, the modal will fill all the vertical space on the screen. You can constrain the height of the modal so it does not fill all the vertical space on the screen by placing a CSS `height` style rule on the element that you pass to the `modalBody` snippet and setting the `scrollingBody` prop of the `<Modal>` to `false`. Refer to the previous example.

---

## Props

<div class="responsive-table">

| Prop name | Type | Possible values | Default value | Description |
| --------- | ---- | --------------- | ------------- | ----------- |
| `title` | `string` | Any string | `""` (an empty string) | This prop will set the title of the modal. |
| `scrollingBody` | `boolean` | `true`, `false` | `true` | If this prop is set to `true`, then the modal will fill the height of the screen. Also, if the content inside the modal body overflows the available space, then a scrollbar will appear and the modal body content will scroll. |
| `focusElement` | `string` | Any string | `""` (an empty string) | Pass the `id` attribute value of the element that should receive focus when the modal opens. |
| `disabled` | `boolean` | `true`, `false` | `false` | When this prop is set to `true` then the close button in the top-right corner of the modal will be disabled. You might want to disable the close button in scenarios where a user clicks a button that will save edits to a database and you don't want users to be able to close the modal until after the edits have been saved to a database. |
| `showCloseBtn` | `boolean` | `true`, `false` | `true` | You can set `showCloseBtn` to `false` for modals where you don't want to show a close button in the top-right corner. |
| `modalWidth` | `string` | `auto`, `100%` | `auto` | `auto` will cause the modal to be as wide as the content inside the modal, but no wider than the maximum modal width, which is 950px. `100%` will cause the modal to be as wide as the maximum modal width no matter how wide the modal content is. |
| `modalBackgroundColor` | `string` | Any CSS color string | `var(--white)` | For modals that display text, the default background color might be fine. For modals that display other components (e.g. `<DatePickerCalendar>`, `<Calculator>`), you may want to set this value to `transparent`. |

</div>

<br>

## Callback Props

<div class="responsive-table">

| Event | Description |
| ----- | ----------- |
| `onCloseModalCallback` | The `onCloseModalCallback` prop is used to hide the modal when a user clicks the modal's close button. |

</div>

<br>

## Snippets

<div class="responsive-table">

| Snippet name | Default value | Description |
| ------------ | ------------- | ----------- |
| `modalBody` | NA | The content that is passed to this snippet will be displayed in the modal body. You can pass any custom content to this snippet. See the example under the "Exclude Modal Header or Footer" heading.<br><br>The content that is passed in between the opening `{#snippet modalBody()}` and closing `{/snippet}` tags will not have any padding around it. This works great for displaying things like a sign in form, an image, or a chart. But if you want to pass text in between those tags, then you should include some padding styles so the text isn't right up against the border of the `modalBody`. |
| `modalFooterLeft` | NA | The content that is passed to this snippet will be displayed in the left side of the modal footer. |
| `modalFooterRight` | NA | The content that is passed to this snippet will be displayed in the right side of the modal footer. |

</div>

<br>

**NOTE**: The footer is designed to contain buttons. You can include as many footer buttons as you want as long as they fit the footer space without spilling over.


<style>
  @media (--xs-up) {
    .modal-body {
      padding: 5px;
    }

    #custom-p {
      font-size: 2rem;
      line-height: 2rem;
    }
  }

  @media (--lg-up) {
    .modal-body {
      padding: 15px;
    }
  }
</style>
