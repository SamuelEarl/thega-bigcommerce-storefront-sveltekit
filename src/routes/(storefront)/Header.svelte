<script lang="ts" module>
  export interface ISubmenu {
    label: string;
    url: string;
  }

  export interface IMenuItem {
    label: string;
    url: string;
    submenu: ISubmenu[];
  }

  export interface IIconBtn {
    icon: string;
    url: string;
    size: string;
  }
</script>

<script lang="ts">
  import MobileHeader from "./MobileHeader.svelte";
  import DesktopHeader from "./DesktopHeader.svelte";

  // TODO: Add an interface for mainNav and import it into the MobileHeader and DesktopHeader components.
  const mainNav: IMenuItem[] = [
    {
      label: "MEN",
      url: "/men",
      // Each object within the submenu is a link to a list page.
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
  ];

  const iconBtns: IIconBtn[] = [
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
</script>

<MobileHeader {mainNav} {iconBtns} />
<DesktopHeader {mainNav} {iconBtns} />
