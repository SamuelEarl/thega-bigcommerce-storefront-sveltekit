<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import { Button, Icon, Link } from "$lib/client/components";
	import LogoWhite from "$lib/client/assets/images/logo-and-name-horizontal-white-fbfbfb.svg";

	interface Props {
		mainNav: any;
  }

  let {
    mainNav
  }: Props = $props();

	let desktopMainNavRef: HTMLElement;
	let desktopMegaMenuContainerRef: HTMLElement;
	let desktopMegaMenuNavRef: HTMLElement;

	let userIsFocusedOnDesktopMainNavRef = $state(false);
	let userIsFocusedOnDesktopMegaMenuContainerRef = $state(false);

	let activeMegaMenu = $state("");

	const iconBtns = [
		{
			icon: "material-symbols:search",
			url: "",
			size: "font-size: 24px",
		},
		{
			icon: "material-symbols:shopping-bag-outline-sharp",
			url: "",
			size: "font-size: 22px",
		},
		{
			icon: "material-symbols:person-outline",
			url: "",
			size: "font-size: 24px",
		},
	];

	function getActiveMegaMenu() {
		const megaMenu = mainNav.menu.find(menu => menu.label === activeMegaMenu);
		return megaMenu?.submenu;
	}

	// function getMainMenuItemURL() {
	// 	const displayNav = mainNav.menu.find(menu => menu.label === activeMegaMenu);
	// 	return displayNav?.url;
	// }

	/**
	 * If the user hovered (or focused their keyboard event) somewhere outside of the main nav AND mega menu,
	 * then hide the mega menu.
	 * @param event
	 */
	function checkIfUserIsFocusedOnMenu() {
		if (!userIsFocusedOnDesktopMainNavRef && !userIsFocusedOnDesktopMegaMenuContainerRef) {
			activeMegaMenu = "";
			desktopMegaMenuNavRef.style.top = "-100vh";
		}
		else {
			desktopMegaMenuNavRef.style.top = "-1px";
		}
	}
</script>

<header class="desktop-header">
	<div class="main-nav-container">
		<div class="logo-wrapper">
			<a href="/"><img src={LogoWhite} class="logo" alt="logo" /></a>
		</div>
	
		<nav
			bind:this={desktopMainNavRef}
			onmouseout={() => {
				userIsFocusedOnDesktopMainNavRef = false;
				checkIfUserIsFocusedOnMenu();
			}}
			onblur={() => {
				userIsFocusedOnDesktopMainNavRef = false;
				checkIfUserIsFocusedOnMenu();
			}}
		>
			<ul>
				{#each mainNav.menu as item}	
					<li
						onmouseover={() => {
							activeMegaMenu = item.label;
							userIsFocusedOnDesktopMainNavRef = true;
							checkIfUserIsFocusedOnMenu();
						}}
						onfocus={() => {
							activeMegaMenu = item.label;
							userIsFocusedOnDesktopMainNavRef = true;
							checkIfUserIsFocusedOnMenu();
						}}
					>
						<a href={item.url}>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="icons-wrapper">
			{#each iconBtns as icon}
				<div><Icon icon={icon.icon} style={icon.size} /></div>
			{/each}
		</div>
	</div>

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="mega-menu-container"
		bind:this={desktopMegaMenuContainerRef}
		onmouseover={() => {
			userIsFocusedOnDesktopMegaMenuContainerRef = true;
			checkIfUserIsFocusedOnMenu();
		}}
		onfocus={() => {
			userIsFocusedOnDesktopMegaMenuContainerRef = true;
			checkIfUserIsFocusedOnMenu();
		}}
		onmouseout={() => {
			userIsFocusedOnDesktopMegaMenuContainerRef = false;
			checkIfUserIsFocusedOnMenu();
		}}
		onblur={() => {
			userIsFocusedOnDesktopMegaMenuContainerRef = false;
			checkIfUserIsFocusedOnMenu();
		}}
	>
		<nav bind:this={desktopMegaMenuNavRef}>
			<ul>
				<li>Mega Menu</li>
				<li>Goes here</li>
				{#each getActiveMegaMenu() as item}
					<li>
						<Link href={item.url} variant="secondary" underline={false}>
							{item.label}
						</Link>
					</li>
				{/each}
			</ul>
		</nav>
	</div>

</header>

<style>
	@media (--xs-up) {
		header.desktop-header {
			display: none;
		}
	}

	@media (--lg-up) {
		header.desktop-header {
			display: block;
			position: sticky;
			top: 0;
			background-color: var(--black);
			color: var(--white);
			z-index: 100;

			& .main-nav-container {
				/* The hero image is 1536px wide. So I want to give the content a max width that equals the --xl-max media query. */
				max-width: var(--xl-max);
				margin: 0 auto;
				padding: 0 15px;
				/* width: 100%; */
				display: flex;
				justify-content: space-between;
				align-items: center;

				& .logo-wrapper {

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
						margin: 0;
						font-size: 20px;

						& li {
							margin: 0;
							padding: 15px 0;

							&:hover {
								color: var(--old-gold);
							}
						}
					}
				}

				& .icons-wrapper {
					display: flex;
					align-items: center;
					gap: 0 20px;

					& :global(.icon--material-symbols:hover) {
						color: var(--old-gold);
					}
				}
			}

			& .mega-menu-container {
				max-width: var(--xl-max);
				margin: 0 auto;
				padding: 0 15px;
				position: relative;

				& nav {
					position: absolute;
					top: -100vh;
					width: 100%;
					background-color: var(--black);
					color: var(--white);
				}
			}
		}
	}
</style>
