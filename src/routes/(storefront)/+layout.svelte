<script lang="ts">
  import { beforeNavigate, goto } from "$app/navigation";
	import type { Snippet } from "svelte";
  import Header from "./Header.svelte";
	import { Button, Icon } from "$lib/client/components";
	import "$lib/client/assets/styles/main.css";
  import LogoWhite from "$lib/client/assets/images/logo-and-name-horizontal-white-fbfbfb.svg";
  // import LogoBlack from "$lib/client/assets/images/logo-and-name-horizontal-black-191919.svg";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();

  const iconSizes = "font-size: 24px";

  // # State Management for User Permissions
  // * TODO: I don't think I need to worry about checking the user's authentication status in the client side because that is already handled on the server with each page request. However, I will need to have access to the user's permissions array in the client side to show or hide different features in the UI. I think I would call the `/auth/get-current-user` API endpoint from the `+layout.svelte` file and store that information in a store with context (see the following notes). The Kinde SvelteKit SDK used the `+layout.server.ts` file to check for authentication and then do some other stuff, so I think the `+layout.svelte` file would make sense to handle some of this auth stuff.
  // * I also need to be able to update a user's permissions when they subscribe to new features or cancel their subscription. (See this file: src/routes/(private)/iam/update-permissions/+server.ts) I think that would be done using the same techniques (e.g. load function plus pass data to components or use the $page.data store) and I would need to set a new cookie with those permissions.

  // TODO: IMPLEMENT ROUTE GUARDS HERE WITH KINDE. There is also a beforeNavigate method in the "src/routes/(private)/+layout.svelte" file, so I need to figure out which location makes the most sense for this method. Since I am trying to protect private routes it might make more sense to have a route guard in the private layout file.

  /**
   * Reset the page scroll position to the top on navigation.
   * The following GitHub issue explains that using `height:100vh` along with `overflow:auto` creates a scenario in the CSS that prevents the page from setting the page scroll position to the top when a user navigates to a new page: https://github.com/sveltejs/kit/issues/2733
   * One of the comments in that issue mentioned using the `afterNavigate` (https://kit.svelte.dev/docs/modules#$app-navigation-afternavigate) hook to reset the scroll position. Since the layout that I am using requires the scroll position in the <main> element to be reset, then I am referencing the <main> element in the `afterNavigate` hook and setting its scroll position to 0.
   */
  beforeNavigate(({ to }) => {
    const main = document.getElementById("main");
    // If the user clicks a bookmark link, then the `to` object will include a hash. But if a user clicks a regular page link, then there won't be a hash. So if a user navigates to a new page by clicking on a page link (not a bookmark link), then make sure the page is scrolled to the top.
    if (main && !to.url.hash) {
      main.scrollTop = 0;
    }
  });
</script>

<svelte:head>
	<title>THEGA | THE GAME IS LIFE</title>
</svelte:head>

<div class="layout">
  <!-- <Header /> -->
  <header>
    <div class="header-content">
      <div class="logo-wrapper">
        <a href="/"><img src={LogoWhite} class="logo" alt="logo" /></a>
      </div>
      <nav>
        <ul>
          <li>Men</li>
          <li>Women</li>
          <li>Boys</li>
          <li>Girls</li>
        </ul>
      </nav>
      <div class="icons-wrapper">
        <div><Icon icon="material-symbols:search" style={iconSizes} /></div>
        <div><Icon icon="material-symbols:shopping-bag-outline-sharp" style="font-size: 22px;" /></div>
        <div><Icon icon="material-symbols:person-outline" style={iconSizes} /></div>
      </div>
    </div>
  </header>
  <main id="main">
    <div class="hero-image">
      <div class="hero-content">
        <h1>THE GAME IS LIFE</h1>
        <p>
          For those who live and breathe sports and fitness
          <br>
          <em><strong>THE GAME IS LIFE</strong></em>
          <br>
          and our gear powers every step forward.
        </p>
        <div class="cta">
          <Button
            variant="tertiary"
            onclick={() => alert("Button has been clicked")}
          >
            SHOP NOW
          </Button>
        </div>
      </div>
    </div>
    <div class="main-content">
      {@render children?.()}
    </div>
  </main>
</div>

<style>
	@media (--xs-up) {
		.layout {
			display: flex;
			flex-direction: column;
			min-height: 100vh;

      & header {
        position: sticky;
        top: 0;
        background-color: var(--black);

        & .header-content {
          /* The hero image is 1536px wide. So I want to give the content a max width that equals the --xl-max media query. */
          max-width: 1535px;
          margin: 0 auto;
          padding: 0 15px;
          display: flex;
          align-items: center;
          color: var(--white);

          & .logo-wrapper {
            padding: 12px 0;

            & .logo {
              height: 40px;
            }
          }

          & nav {
            flex: 1;

            & ul {
              display: flex;
              justify-content: center;
              gap: 0 20px;
              list-style-type: none;
              padding: 0;
              font-size: 20px;

              & li {
                margin: 0;

                &:hover {
                  color: var(--old-gold);
                }
              }
            }
          }

          .icons-wrapper {
            display: flex;
            align-items: center;
            gap: 0 20px;

            & :global(.icon--material-symbols:hover) {
              color: var(--old-gold);
            }
          }
        }
      }

			& main {
        flex: 1;
				height: 100vh;
				overflow-y: auto;
        background-color: var(--white);

        & .hero-image {
          height: 768px;
          background-image: url("src/lib/client/assets/images/hero-image-optimized.webp");
          background-repeat: no-repeat;
          background-attachment: fixed;
          background-position: center;
          background-size: cover;
          margin-bottom: 20px;
          display: flex;
          justify-content: end;
          align-items: center;

          & .hero-content {
            margin-right: 100px;
            text-align: center;
            padding: 20px;
            /* background-color: rgba(0, 0, 0, 0.2); */
            color: var(--old-gold);

            h1 {
              font-size: var(--size-11);
              font-weight: bold;
            }

            p {
              font-size: var(--size-6);
            }

            .cta {
              display: flex;
              justify-content: center;
            }
          }
        }

        & .main-content {
          max-width: 1535px;
          margin: 0 auto;
          padding: 0 15px;
          /* padding-top: 80px; */
        }
			}

      & footer {

        & .footer-content {
          max-width: 1535px;
          margin: 0 auto;
          padding: 0 15px;
        }
      }
		}
	}

	@media (--lg-up) {
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
