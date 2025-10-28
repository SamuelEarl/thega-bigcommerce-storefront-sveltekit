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

	let desktopMainNavContainerRef: HTMLDivElement;
	let desktopMegaMenuContainerRef: HTMLDivElement;

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

	function getActiveSubmenu() {
		const displayNav = mainNav.menu.find(menu => menu.label === activeMegaMenu);
		return displayNav?.submenu;
	}

	function getMainMenuItemURL() {
		const displayNav = mainNav.menu.find(menu => menu.label === activeMegaMenu);
		return displayNav?.url;
	}
</script>

<header class="desktop-header">
	<div class="header-content">
		<div class="main-nav-container" bind:this={desktopMainNavContainerRef}>
			<div class="logo-wrapper">
				<a href="/"><img src={LogoWhite} class="logo" alt="logo" /></a>
			</div>
		
			<nav>
				<ul>
					{#each mainNav.menu as item}	
						<li
							onmouseover={() => activeMegaMenu = item.label}
							onfocus={() => activeMegaMenu = item.label}
							onmouseout={() => activeMegaMenu = ""}
							onblur={() => activeMegaMenu = ""}
						>
							<a href={item.url}>{item.label}</a>
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

		<div class="mega-menu-container" bind:this={desktopMegaMenuContainerRef}>
			<nav>
				<ul>
					<!-- {#each getActiveSubmenu() as item}
						<li>
							<Link href={item.url} variant="secondary" underline={false}>
								{item.label}
							</Link>
						</li>
					{/each} -->
					<li>Mega Menu</li>
					<li>Goes here</li>
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
		header.desktop-header {
			display: block;
			position: sticky;
			top: 0;
			background-color: var(--black);

			& .header-content {
				/* The hero image is 1536px wide. So I want to give the content a max width that equals the --xl-max media query. */
				max-width: 1535px;
				margin: 0 auto;
				padding: 0 15px;

				& .main-nav-container {
					width: 100%;
					display: flex;
					justify-content: space-between;
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
					/* display: none; */
					position: relative;
					z-index: 100;

					& nav {
						position: absolute;
						top: 0;
						width: 100%;
						background-color: var(--old-gold);
					}
				}
			}
		}
	}
</style>
