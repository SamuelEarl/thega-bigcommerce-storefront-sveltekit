<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import { Button, Icon, Link } from "$lib/client/components";
	// import MainNav from "./MainNav.svelte";
	import LogoWhite from "$lib/client/assets/images/logo-and-name-horizontal-white-fbfbfb.svg";

	let mainNavContainer: HTMLDivElement;
	// let showMainNav = $state(false);

	// On mobile close the MainNav after a user navigates so it
	// is not still displaying after a user has clicked a link.
	afterNavigate(async () => {
		mainNavContainer.style.right = "110vw"
	});

	const mainNav = {
		name: "MAIN",
		menu: [
			{
				label: "MEN",
				url: "/collections/men",
				submenu: [
					{
						label: "Shoes",
						url: "/collections/men/shoes",
					},
					{
						label: "Shirts",
						url: "/collections/men/shirts",
					},
				],
			},
			{
				label: "WOMEN",
				url: "/collections/women",
				submenu: [
					{
						label: "Shoes",
						url: "/collections/women/shoes",
					},
					{
						label: "Shirts",
						url: "/collections/women/shirts",
					},
				],
			},
			{
				label: "BOYS",
				url: "/collections/boys",
				submenu: [
					{
						label: "Shoes",
						url: "/collections/boys/shoes",
					},
					{
						label: "Shirts",
						url: "/collections/boys/shirts",
					},
				],
			},
			{
				label: "GIRLS",
				url: "/collections/girls",
				submenu: [
					{
						label: "Shoes",
						url: "/collections/girls/shoes",
					},
					{
						label: "Shirts",
						url: "/collections/girls/shirts",
					},
				],
			},
		],
	};

	let activeNav = "MAIN";
	console.log("activeNav:", activeNav);

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

	function getActiveNav() {
		const displayNav = mainNav.menu.find(menu => menu.label === activeNav);
		return displayNav?.submenu;
	}
</script>

<header>
	<div class="header-content">
		<div class="open-menu-btn-container">
			<Button
				sizes={{ pv:0, ph:0 }}
				onclick={() => {
					activeNav = "MAIN";
					mainNavContainer.style.right = "0";
				}}
			>
				<Icon icon="material-symbols:menu" style="font-size: var(--size-8)" />
			</Button>
		</div>
		<div class="logo-wrapper">
			<a href="/"><img src={LogoWhite} class="logo" alt="logo" /></a>
		</div>
		<div class="main-nav" bind:this={mainNavContainer}>
			<div class="menu-top-btns">
					<div class="back-to-main-menu-btn-container">
						{#if activeNav !== "MAIN"}
							<Button
								sizes={{ pv:0, ph:0 }}
								onclick={() => activeNav = "MAIN"}
							>
								<Icon icon="material-symbols:chevron-left" style="font-size: var(--size-8)" /> MAIN
							</Button>
						{/if}
					</div>
				<div class="close-menu-btn-container">
					<Button
						sizes={{ pv:0, ph:0 }}
						onclick={() => mainNavContainer.style.right = "110vw"}
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
			{#if activeNav === "MAIN"}
				<nav>
					<ul>
						{#each mainNav.menu as item}				
							<li>
								<Button onclick={() => activeNav = item.label}>
									{item.label}
								</Button>
							</li>
						{/each}
					</ul>
				</nav>
			{:else}
				<nav>
					<ul>
						{#each getActiveNav() as item}
							<li>
								<Link href={item.url} variant="tertiary" underline={false}>
									{item.label}
								</Link>
							</li>
						{/each}
					</ul>
				</nav>
			{/if}
		</div>
		<div>
			<Icon icon="material-symbols:menu" style="font-size: var(--size-8); color: transparent" />
		</div>
	</div>
</header>

<style>
	@media (--xs-up) {
		header {
			position: sticky;
			top: 0;
			background-color: var(--black);
			z-index: 100;

			& .header-content {
				display: flex;
				justify-content: space-between;
				/* The hero image is 1536px wide. So I want to give the content a max width that equals the --xl-max media query. */
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

				& .main-nav {
					display: flex;
					flex-direction: column;
					position: absolute;
					top: 0;
					right: 110vw;
					width: 100vw;
					min-height: 100vh;
					overflow-y: auto;
					padding: 15px;
					background-color: var(--black);
					border-right: 1px solid var(--old-gold);
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
						gap: 0 20px;

						& :global(.icon--material-symbols:hover) {
							color: var(--old-gold);
						}
					}

					& nav {
						flex: 1;

						& ul {
							display: flex;
							flex-direction: column;
							justify-content: center;
							gap: 0 20px;
							list-style-type: none;
							padding: 0;
							font-size: 20px;

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
		header {
			/* position: sticky;
			top: 0;
			background-color: var(--black); */

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

				& .icons-wrapper {
					display: flex;
					align-items: center;
					gap: 0 20px;

					& :global(.icon--material-symbols:hover) {
						color: var(--old-gold);
					}
				}
			}
		}
	}
</style>

<!-- <div class="mobile-header-nav-wrapper">
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
		I might use this <div class="spacer"> element until I am ready to include the login button for the app.
		TODO: At that point I will delete this <div class="spacer"> element.
		<div class="spacer">
			<Icon icon="mdi:menu" width="40" color="transparent" />
		</div>
	</header>

	{#if showMainNav}
		<div class="main-nav-wrapper">
			<MainNav />
		</div>
	{/if}
</div> -->

<!-- <style>
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
</style> -->
