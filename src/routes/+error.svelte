<!-- SvelteKit will display this file when an error occurs inside a `load` function. See https://kit.svelte.dev/docs/errors#responses. -->

<script lang="ts">
  import { page } from "$app/state";
  import { Link } from "$lib/client/components";
</script>

<div class="error-page">
  {#if page.status === 404}
    <h1>We can't find the page you are looking for.</h1>
    <div class="instructions">
      <button type="button" onclick={() => history.back()}>
        Go back to previous page &#8250;
      </button>
    </div>
  {:else}
    <h1>We can't find what you are looking for.</h1>
    <div class="instructions">
      <Link href="/">
        Return to the home page and start again &#8250;
      </Link>
    </div>
  {/if}
</div>

<style>
  .error-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25px 15px;
    background-image: radial-gradient(#e4547b, #b91d47);
    color: var(--white);

    & h1 {
      font-size: var(--size-10);
      margin-bottom: 40px;
    }

    & button {
      font-size: var(--size-6);
      color: var(--white);
      border-bottom: 1px dotted white;

      &:hover {
        border-bottom-color: transparent;
      }
    }
  }
</style>
