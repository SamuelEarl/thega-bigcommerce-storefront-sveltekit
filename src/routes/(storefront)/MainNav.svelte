<script lang="ts">
	import { page } from "$app/state";
	import { fly } from "svelte/transition";
	import { Icon } from "$lib/client/components";
  // import { user } from "/src/stores/iam";
	// import { screenWidth } from "$lib/utils/index.svelte";

	let currentPath = $derived(page.url.pathname);

	// const mainNav = mainNavContext;
	const mainNav = [
    {
			label: "Men",
			url: "/collections/men",
		},
		{
			label: "Women",
			url: "/collections/wommen",
		},
		{
			label: "Boys",
			url: "/collections/boys",
		},
		{
			label: "Girls",
			url: "/collections/girls",
		},
	];
</script>

<!-- 
  If I use an {#if} block here, then the mobile-nav will not transition
  into and out of the DOM. So I am using a `display: none` style rule instead. 
-->
<!-- {#if screenWidth < 1024} -->
<nav class="main-nav" transition:fly>
	<ul class="main-nav-list">
		{#each mainNav as item}
			<!-- Display each link as long as it is not the Admin link. -->
			{#if item.url !== "/admin"}
				<li>
					<a href={item.url} class:active={currentPath.startsWith(item.url)}>
						<Icon icon={item.icon} />
						{item.label}
					</a>
					{#if item.addOns?.length}
						<ul class="add-ons">
							{#each item.addOns as addOn}
								<li class="add-on">
									<a href={addOn.url} class:active={currentPath.startsWith(addOn.url)}>
										<Icon icon={addOn.icon} />
										{addOn.label}
									</a>
								</li>	
							{/each}
						</ul>
					{/if}
				</li>
			{/if}
		{/each}
    <li>
      <a href="__API_DOMAIN__/api/auth/logout">
        <Icon icon="ri:logout-circle-line" />
        Sign Out
      </a>
    </li>
	</ul>
</nav>
<!-- {/if} -->

<style>
	@media (--xs-up) {
		nav {
			border-top: 2px solid var(--neutral-12);

			& ul.main-nav-list {
        margin: 0;
				/* The height of the mobile nav menu is 100vh minus the height of the header. */
				height: calc(100vh - 64px);
				display: flex;
				flex-direction: column;
				padding: 0;
				padding-top: 10px;
				list-style: none;
				overflow-y: auto;
				background-color: var(--secondary-bg);

				& li {
					& a {
						display: flex;
						align-items: center;
						padding: 12px 20px;
						border-bottom: none;
						color: var(--white);
						gap: 10px;

						/* & :global(.iconify) {
							margin-right: 10px;
						} */

						&.active {
							background-color: var(--primary-bg);
						}
					}
				}
			}

			& ul.add-ons {
				margin-bottom: 0;
				padding-top: 10px;
				padding-left: 0;
				border-top: 2px solid var(--neutral-12);
				border-bottom: 2px solid var(--neutral-12);

				& li.add-on {

					& a {
						padding-left: 35px;
					}
				}
			}
		}
	}

	@media (--lg-up) {
		nav {
			& ul {
				height: auto;
			}
		}
	}
</style>
