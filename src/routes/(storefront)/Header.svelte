<script lang="ts">
  import MobileHeader from "./MobileHeader.svelte";
  import DesktopHeader from "./DesktopHeader.svelte";

  // TODO: Add an interface for mainNav and import it into the MobileHeader and DesktopHeader components.
  const mainNav = {
		name: "MAIN",
		menu: [
			{
				label: "MEN",
				url: "/men",
				submenu: [
					{
						label: "Shoes",
						url: "/men/shoes",
					},
					{
						label: "Polos",
						url: "/men/polos",
					},
				],
			},
			{
				label: "WOMEN",
				url: "/women",
				submenu: [
					{
						label: "Shoes",
						url: "/women/shoes",
					},
					{
						label: "Sweats",
						url: "/women/sweats",
					},
				],
			},
			{
				label: "BOYS",
				url: "/boys",
				submenu: [
					{
						label: "Shoes",
						url: "/boys/shoes",
					},
					{
						label: "Shirts",
						url: "/boys/shirts",
					},
          {
						label: "Shorts",
						url: "/boys/shorts",
					},
          {
						label: "Sweats",
						url: "/women/sweats",
					},
				],
			},
			{
				label: "GIRLS",
				url: "/girls",
				submenu: [
					{
						label: "Shoes",
						url: "/girls/shoes",
					},
					{
						label: "Shirts",
						url: "/girls/shirts",
					},
          {
						label: "Pants",
						url: "/boys/pants",
					},
				],
			},
		],
	};
</script>

<MobileHeader {mainNav} />
<DesktopHeader {mainNav} />
