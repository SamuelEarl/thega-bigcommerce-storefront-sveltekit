<script lang="ts">
	// import { afterNavigate } from "$app/navigation";
	import { Icon, Link } from "$lib/client/components";
	import LogoWhite from "$lib/client/assets/images/logo-and-name-horizontal-white-fbfbfb.svg";
	import type { ISubmenu, IMenuItem, IIconBtn } from "./Header.svelte";

	interface Props {
		mainNav: IMenuItem[];
		iconBtns: IIconBtn[];
  }

  let {
    mainNav,
		iconBtns,
  }: Props = $props();

	let megaMenuInnerContainerRef: HTMLElement;

	let isUserFocusedOnMainNavElement = $state(false);
	let isUserFocusedOnMegaMenuOuterContainerElement = $state(false);

	let activeSubmenu: ISubmenu[] = $state([]);

	function setActiveSubmenu(menuLabel: string) {
		const menu = mainNav.find(menuItem => menuItem.label === menuLabel);
		if (menu) {
			activeSubmenu = menu.submenu;
		}
		else {
			activeSubmenu = [];
		}
	}

	/**
	 * If the user hovered (or focused their keyboard event) somewhere outside of the main nav AND mega menu,
	 * then hide the mega menu.
	 * @param event
	 */
	function checkIfUserIsFocusedOnMenu() {
		if (!isUserFocusedOnMainNavElement && !isUserFocusedOnMegaMenuOuterContainerElement) {
			megaMenuInnerContainerRef.style.display = "none";
		}
		else {
			megaMenuInnerContainerRef.style.display = "block";
		}
	}
</script>

<header class="desktop-header">
	<div class="main-nav-container">
		<div class="logo-wrapper">
			<a href="/"><img src={LogoWhite} class="logo" alt="logo" /></a>
		</div>
	
		<nav
			class="main-nav"
			onmouseout={() => {
				isUserFocusedOnMainNavElement = false;
				checkIfUserIsFocusedOnMenu();
			}}
			onblur={() => {
				isUserFocusedOnMainNavElement = false;
				checkIfUserIsFocusedOnMenu();
			}}
		>
			<ul>
				{#each mainNav as menuItem}	
					<li
						onmouseover={() => {
							setActiveSubmenu(menuItem.label);
							isUserFocusedOnMainNavElement = true;
							checkIfUserIsFocusedOnMenu();
						}}
						onfocus={() => {
							setActiveSubmenu(menuItem.label);
							isUserFocusedOnMainNavElement = true;
							checkIfUserIsFocusedOnMenu();
						}}
					>
						<a href={menuItem.url}>
							{menuItem.label}
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
		class="mega-menu-outer-container"
		onmouseover={() => {
			isUserFocusedOnMegaMenuOuterContainerElement = true;
			checkIfUserIsFocusedOnMenu();
		}}
		onfocus={() => {
			isUserFocusedOnMegaMenuOuterContainerElement = true;
			checkIfUserIsFocusedOnMenu();
		}}
		onmouseout={() => {
			isUserFocusedOnMegaMenuOuterContainerElement = false;
			checkIfUserIsFocusedOnMenu();
		}}
		onblur={() => {
			isUserFocusedOnMegaMenuOuterContainerElement = false;
			checkIfUserIsFocusedOnMenu();
		}}
	>
		<div 
			bind:this={megaMenuInnerContainerRef}
			class="mega-menu-inner-container"
		>
			<nav>
				<ul>
					{#each activeSubmenu as link}
						<li>
							<Link href={link.url} variant="secondary" underline={false}>
								{link.label}
							</Link>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>

</header>

<style>
	@media (--xs-up) {
		header.desktop-header {
			display: none;
		}
	}

	@media (--lg-up) {
		ul {
			list-style-type: none;
			padding: 0;
			margin: 0;
		}

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
						font-size: var(--size-5);

						& li {
							margin: 0;
							padding: var(--size-4) var(--size-6);

							&:hover {
								color: var(--old-gold);
							}
						}
					}
				}

				& .icons-wrapper {
					display: flex;
					align-items: center;
					gap: 0 var(--size-5);

					& :global(.icon--material-symbols:hover) {
						color: var(--old-gold);
					}
				}
			}

			& .mega-menu-outer-container {
				position: relative;

				& .mega-menu-inner-container {
					/* To display the mega menu so you can edit it, comment out this `display: none;` property and the 
					`megaMenuInnerContainerRef.style.display = "none";` line in the JavaScript code and hover over one of the main menu items to populate the mega menu with data. */
					display: none;
					position: absolute;
					width: 100%;
					background-color: var(--black);
					color: var(--white);

					& nav {
						max-width: var(--sm-max);
						margin: 0 auto;
						padding: 20px;
					}
				}
			}
		}
	}
</style>
