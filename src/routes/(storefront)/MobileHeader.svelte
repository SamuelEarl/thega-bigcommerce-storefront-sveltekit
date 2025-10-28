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

	let mobileMainNavContainerRef: HTMLDivElement;
	let mobileSubnavContainerRef: HTMLDivElement;

	// On mobile close the nav containers after a user navigates so they
	// are not still displaying after a user has clicked a link.
	afterNavigate(() => {
		if (mobileMainNavContainerRef) mobileMainNavContainerRef.style.right = "110vw";
		if (mobileSubnavContainerRef) mobileSubnavContainerRef.style.right = "110vw";
	});

	let activeNav = $state("MAIN");

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

	function getActiveSubmenu() {
		const displayNav = mainNav.menu.find(menu => menu.label === activeNav);
		return displayNav?.submenu;
	}

	function getMainMenuItemURL() {
		const displayNav = mainNav.menu.find(menu => menu.label === activeNav);
		return displayNav?.url;
	}
</script>

<header class="mobile-header">
	<div class="header-content">
		<div class="open-menu-btn-container">
			<Button
				sizes={{ pv:0, ph:0 }}
				onclick={() => {
					activeNav = "MAIN";
					// Display the main nav container.
					mobileMainNavContainerRef.style.right = "0";
				}}
			>
				<Icon icon="material-symbols:menu" style="font-size: var(--size-8)" />
			</Button>
		</div>
		<div class="logo-wrapper">
			<a href="/"><img src={LogoWhite} class="logo" alt="logo" /></a>
		</div>
		<div>
			<Icon icon="material-symbols:menu" style="font-size: var(--size-8); color: transparent;" />
		</div>
		
		<div class="main-nav-container" bind:this={mobileMainNavContainerRef}>
			<div class="menu-top-btns">
				<!-- This empty <div> is used as a spacer element so the close button will align properly to the right. -->
				<div></div>
				<div class="close-menu-btn-container">
					<Button
						sizes={{ pv:0, ph:0 }}
						onclick={() => {
							// Hide the main nav container.
							mobileMainNavContainerRef.style.right = "110vw";
						}}
					>
						<Icon icon="material-symbols:close" style="font-size: var(--size-8)" />
					</Button>
				</div>
			</div>
			<div class="icons-wrapper">
				{#each iconBtns as icon}
					<div><Icon icon={icon.icon} style={icon.size} /></div>
				{/each}
			</div>
			<nav>
				<ul>
					{#each mainNav.menu as item}				
						<li>
							<button
								style="width: 100%; display: flex; justify-content: space-between;"
								onclick={() => {
									// Set the `activeNav` to the subnav that was clicked.
									activeNav = item.label;
									// Display the subnav container.
									mobileSubnavContainerRef.style.right = "0"
								}}
							>
									{item.label} <Icon icon="material-symbols:chevron-right" style="font-size: var(--size-8); color: var(--old-gold);" />
							</button>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<div class="subnav-container" bind:this={mobileSubnavContainerRef}>
			<div class="menu-top-btns">
				<div class="back-to-main-menu-btn-container">
					{#if activeNav !== "MAIN"}
						<Button
							sizes={{ pv:0, ph:0 }}
							onclick={() => {
								activeNav = "MAIN";
								// Hide the subnav container.
								mobileSubnavContainerRef.style.right = "110vw";
								// Display the main nav container.
								mobileMainNavContainerRef.style.right = "0";
							}}
						>
							<Icon icon="material-symbols:chevron-left" style="font-size: var(--size-8); color: var(--old-gold);" /> MAIN
						</Button>
					{/if}
				</div>
				<div class="close-menu-btn-container">
					<Button
						sizes={{ pv:0, ph:0 }}
						onclick={() => {
							// Hide both nav containers.
							mobileMainNavContainerRef.style.right = "110vw";
							mobileSubnavContainerRef.style.right = "110vw";
						}}
					>
						<Icon icon="material-symbols:close" style="font-size: var(--size-8)" />
					</Button>
				</div>
			</div>
			<div class="icons-wrapper">
				{#each iconBtns as icon}
					<div><Icon icon={icon.icon} style={icon.size} /></div>
				{/each}
			</div>
			<nav>
				<h4>
					<Link href={getMainMenuItemURL()} variant="tertiary" underline={false}>
						{activeNav}
					</Link>
				</h4>
				<ul>
					{#each getActiveSubmenu() as item}
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
		header.mobile-header {
			display: block;
			position: sticky;
			top: 0;
			background-color: var(--black);
			z-index: 100;

			& .header-content {
				display: flex;
				justify-content: space-between;
				/* The hero image is 1536px wide. So I want to give the content a max width that equals the --xl-max media query. */
				/* TODO: Fix this max-width for the mobile image sizes. */
				max-width: 1535px;
				margin: 0 auto;
				padding: 0 15px;
				display: flex;
				align-items: center;
				color: var(--white);
				position: relative;

				& .logo-wrapper {
					padding: 12px 0;

					& .logo {
						height: 35px;
					}
				}

				/* The nav containers that slide in from the side. */
				& .main-nav-container, & .subnav-container {
					display: flex;
					flex-direction: column;
					position: absolute;
					top: 0;
					right: 110vw;
					width: 100vw;
					height: 100vh;
					padding: 15px;
					background-color: var(--black);
					z-index: 100;
					transition: right 0.25s ease;

					& .menu-top-btns {
						display: flex;
						justify-content: space-between;
						margin-bottom: 15px;
					}

					& .icons-wrapper {
						display: flex;
						justify-content: space-around;
						align-items: center;
						margin-bottom: 20px;

						& :global(.icon--material-symbols:hover) {
							color: var(--old-gold);
						}
					}

					& nav {
						flex: 1;
						overflow-y: auto;

						& h4 {
							padding: 0 10px;
						}

						& ul {
							list-style-type: none;
							padding: 0;
							font-size: var(--size-5);

							& li {
								margin: 0;
								padding: 10px;

								&:hover {
									color: var(--old-gold);
								}
							}
						}
					}
				}
			}
		}
	}

	@media (--lg-up) {
		header.mobile-header {
			display: none;
		}
	}
</style>
