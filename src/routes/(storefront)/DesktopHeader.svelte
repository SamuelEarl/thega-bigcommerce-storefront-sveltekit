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
	let desktopMegaMenuOuterContainerRef: HTMLElement;
	let desktopMegaMenuInnerContainerRef: HTMLElement;
	let desktopMegaMenuNavRef: HTMLElement;

	let userIsFocusedOnDesktopMainNavRef = $state(false);
	let userIsFocusedOnDesktopMegaMenuOuterContainerRef = $state(false);

	let activeMegaMenu = $state([]);

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

	function setActiveMegaMenu(menuLabel: string) {
		const menu = mainNav.menu.find(menu => menu.label === menuLabel);
		activeMegaMenu = menu?.submenu;
	}

	/**
	 * If the user hovered (or focused their keyboard event) somewhere outside of the main nav AND mega menu,
	 * then hide the mega menu.
	 * @param event
	 */
	function checkIfUserIsFocusedOnMenu() {
		if (!userIsFocusedOnDesktopMainNavRef && !userIsFocusedOnDesktopMegaMenuOuterContainerRef) {
			desktopMegaMenuInnerContainerRef.style.top = "-100vh";
		}
		else {
			desktopMegaMenuInnerContainerRef.style.top = "-1px";
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
							setActiveMegaMenu(item.label);
							userIsFocusedOnDesktopMainNavRef = true;
							checkIfUserIsFocusedOnMenu();
						}}
						onfocus={() => {
							setActiveMegaMenu(item.label);
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
		class="mega-menu-outer-container"
		bind:this={desktopMegaMenuOuterContainerRef}
		onmouseover={() => {
			userIsFocusedOnDesktopMegaMenuOuterContainerRef = true;
			checkIfUserIsFocusedOnMenu();
		}}
		onfocus={() => {
			userIsFocusedOnDesktopMegaMenuOuterContainerRef = true;
			checkIfUserIsFocusedOnMenu();
		}}
		onmouseout={() => {
			userIsFocusedOnDesktopMegaMenuOuterContainerRef = false;
			checkIfUserIsFocusedOnMenu();
		}}
		onblur={() => {
			userIsFocusedOnDesktopMegaMenuOuterContainerRef = false;
			checkIfUserIsFocusedOnMenu();
		}}
	>
		<!-- ontransitionstart={() => {
			desktopMegaMenuOuterContainerRef.style.pointerEvents = "none";
		}}
		ontransitionend={() => {
			desktopMegaMenuOuterContainerRef.style.pointerEvents = "auto";
		}} -->
		<div 
			bind:this={desktopMegaMenuInnerContainerRef}
			class="mega-menu-inner-container"
		>
			<nav bind:this={desktopMegaMenuNavRef}>
				<ul>
					{#each activeMegaMenu as item}
						<li>
							<Link href={item.url} variant="secondary" underline={false}>
								{item.label}
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
					position: absolute;
					/* To edit the mega menu styles, comment out this `top: -100vh;` property and the 
					`desktopMegaMenuInnerContainerRef.style.top = "-100vh";` line in the JavaScript code. */
					top: -100vh;
					width: 100vw;
					background-color: var(--black);
					color: var(--white);
					/* transition: top 0.25s ease; */

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
