<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import { Button, Icon } from "$lib/client/components";
	import MainNav from "./MainNav.svelte";
	// import Logo from "$lib/client/assets/images/logo-purple-taupe-dark.svg";
	import Logo from "$lib/client/assets/images/logo-white-fbfbfb.svg";

	let showMainNav = $state(false);

	// On mobile clear the MainNav after a user navigates so it
	// is not still displaying after a user has clicked a link.
	afterNavigate(async (params) => {
		showMainNav = false;
	});
</script>

<div class="mobile-header-nav-wrapper">
	<header>
		<div class="mobile-main-nav-btn-wrapper">
			{#if showMainNav}
				<Button
					onclick={() => (showMainNav = false)}
				>
					<Icon icon="mdi:close" width="40" color="var(--white)" />
				</Button>
			{:else}
				<Button
					onclick={() => (showMainNav = true)}
				>
					<Icon icon="mdi:menu" width="40" color="var(--white)" />
				</Button>
			{/if}
		</div>
		<div class="logo-wrapper">
			<a href="/"><img src={Logo} class="logo" alt="logo" /></a>
		</div>
		<!-- I might use this <div class="spacer"> element until I am ready to include the login button for the app. -->
		<!-- TODO: At that point I will delete this <div class="spacer"> element. -->
		<div class="spacer">
			<Icon icon="mdi:menu" width="40" color="transparent" />
		</div>
	</header>

	{#if showMainNav}
		<div class="main-nav-wrapper">
			<MainNav />
		</div>
	{/if}
</div>

<style>
	@media (--xs-up) {
		.mobile-header-nav-wrapper {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 50;

			& header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px;
				background-color: var(--secondary-bg);
				box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.5);

				& .logo {
					height: 40px;
				}
			}
		}
	}
</style>
