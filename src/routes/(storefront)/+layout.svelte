<script lang="ts">
  import { beforeNavigate, goto } from "$app/navigation";
  import { page } from "$app/state";
	import type { Snippet } from "svelte";
  import Header from "./Header.svelte";
  import HeroImage from "./HeroImage.svelte";
  import Footer from "./Footer.svelte";
	import "$lib/client/assets/styles/main.css";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();

  let currentPath = $derived(page.url.pathname);

  /**
   * Reset the page scroll position to the top on navigation.
   * The following GitHub issue explains that using `height:100vh` along with `overflow:auto` creates a scenario in the CSS that prevents the page from setting the page scroll position to the top when a user navigates to a new page: https://github.com/sveltejs/kit/issues/2733
   * One of the comments in that issue mentioned using the `afterNavigate` (https://kit.svelte.dev/docs/modules#$app-navigation-afternavigate) hook to reset the scroll position. Since the layout that I am using requires the scroll position in the <main> element to be reset, then I am referencing the <main> element in the `afterNavigate` hook and setting its scroll position to 0.
   */
  beforeNavigate(({ to }) => {
    const main = document.getElementById("main");
    // If the user clicks a bookmark link, then the `to` object will include a hash. But if a user clicks a regular page link, then there won't be a hash. So if a user navigates to a new page by clicking on a page link (not a bookmark link), then make sure the page is scrolled to the top.
    if (main && !to?.url.hash) {
      main.scrollTop = 0;
    }
  });
</script>

<svelte:head>
	<title>THEGA SPORTSWEAR | THE GAME IS LIFE</title>
</svelte:head>

<div class="layout">
  <Header />
  <main id="main">
    {#if currentPath === "/"}
      <HeroImage />
    {/if}
    <div class="main-content">
      {@render children?.()}
    </div>
  </main>
  <Footer />
</div>

<style>
	@media (--xs-up) {
		.layout {
			display: flex;
			flex-direction: column;
			min-height: 100vh;

			& main {
        flex: 1;
				height: 100vh;
				overflow-y: auto;
        background-color: var(--white);

        & .main-content {
          max-width: var(--xl-max);
          margin: 0 auto;
          padding: 0 15px 40px 15px;
        }
			}
		}
	}

	@media (--xl-up) {
		/* .layout {
			flex-direction: row;

			& .header-wrapper {
				display: none;
			}

			& main {
				padding-top: 20px;
			}
		} */
	}
</style>
