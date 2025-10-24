<script lang="ts">
  import { page } from "$app/stores";
  import { fly } from "svelte/transition";
  import { Icon } from "$lib/client/components";
  // import { screenWidth } from "$lib/client/components/utils/index.svelte";

  let currentPath = $derived($page.url.pathname);

  // const mainNav = mainNavContext;
  const mainNav = [
    {
      sectionHeading: "Overview",
      sectionUrlPrefix: "/docs",
      sectionItems: [
        {
          icon: "carbon:home",
          label: "Docs Home",
          url: "/",
        },
        // {
        //   icon: "carbon:play",
        //   label: "Get Started",
        //   url: "/get-started",
        // },
        // // {
        // //   icon: "material-symbols:style-outline-sharp",
        // //   label: "Customize Theme",
        // //   url: "/customize-theme",
        // // },
        // {
        //   icon: "ic:baseline-update",
        //   label: "Update To Latest Version",
        //   url: "/update-to-latest-version",
        // },
      ],
    },
    {
      sectionHeading: "UI Components",
      sectionUrlPrefix: "/docs/components/ui",
      sectionItems: [
        {
          icon: "carbon:account",
          label: "Accordions",
          url: "/accordions",
        },
        {
          icon: "carbon:button-centered",
          label: "Buttons",
          url: "/buttons",
        },
        {
          icon: "bx:calculator",
          label: "Calculators",
          url: "/calculators",
        },
        {
          icon: "carbon:checkbox-checked",
          label: "Checkboxes (single)",
          url: "/checkboxes/single",
        },
        {
          icon: "carbon:list-boxes",
          label: "Checkboxes (group)",
          url: "/checkboxes/group",
        },
        {
          icon: "carbon:calendar",
          label: "Date Pickers",
          url: "/date-pickers",
        },
        // See my comment about a color picker component in the TODOS.md file.
        // {
        //   icon: "clarity:color-picker-solid",
        //   label: "Color Pickers",
        //   url: "/color-pickers",
        // },
        {
          icon: "pixelarticons:drop-area",
          label: "Drop Zones (file upload)",
          url: "/drop-zones",
        },
        // {
        //   icon: "ph:layout-light",
        //   label: "Grids (layout)",
        //   url: "/flex-grids",
        // },
        {
          icon: "ph:layout-light",
          label: "Grids (layout)",
          url: "/grids",
        },
        {
          icon: "carbon:currency-dollar",
          label: "Inputs (currency)",
          url: "/inputs/currency",
        },
        {
          icon: "mdi:letter-i-box-outline",
          label: "Icons",
          url: "/icons",
        },
        {
          icon: "radix-icons:input",
          label: "Inputs (text, number, email, password)",
          url: "/inputs/misc",
        },
        {
          icon: "carbon:label",
          label: "Labels",
          url: "/labels",
        },
        {
          icon: "ri:link",
          label: "Links (<a> tags)",
          url: "/links",
        },
        {
          icon: "material-symbols-light:clock-loader-40",
          label: "Loaders (skeletons, spinners)",
          url: "/loaders",
        },
        {
          icon: "carbon:popup",
          label: "Modals (popup window)",
          url: "/modals",
        },
        {
          icon: "carbon:radio-button-checked",
          label: "Radio Buttons",
          url: "/radio-buttons",
        },
        {
          icon: "icon-park-outline:list-view",
          label: "Select Boxes (single select)",
          url: "/select-boxes/single",
        },
        {
          icon: "fluent:multiselect-ltr-20-filled",
          label: "Select Boxes (multi select)",
          url: "/select-boxes/multi",
        },
        {
          icon: "material-symbols:table-outline-sharp",
          label: "Tables",
          url: "/tables",
        },
        {
          icon: "ic:outline-tab",
          label: "Tabs (tabbed content)",
          url: "/tabs",
        },
        {
          icon: "bi:textarea-resize",
          label: "Textareas",
          url: "/textareas",
        },
        {
          icon: "ri:time-line",
          label: "Time Pickers",
          url: "/time-pickers",
        },
        {
          icon: "carbon:information-square",
          label: "Toasts (notification pane)",
          url: "/toasts",
        },
        {
          icon: "carbon:chat",
          label: "Tooltips",
          url: "/tooltips",
        },
      ],
    },
    {
      sectionHeading: "Data Viz Components",
      sectionUrlPrefix: "/docs/components/data-viz",
      sectionItems: [
        {
          icon: "tabler:chart-area-line",
          label: "Area Chart",
          url: "/area-chart",
        },
        {
          icon: "bi:bar-chart",
          iconRotate: "90deg",
          label: "Bar Chart (horizontal)",
          url: "/bar-chart/horizontal",
        },
        {
          icon: "bi:bar-chart",
          label: "Bar Chart (vertical)",
          url: "/bar-chart/vertical",
        },
        {
          icon: "carbon:chart-bubble",
          label: "Bubble Chart",
          url: "/bubble-chart",
        },
        {
          icon: "gis:world-map-alt",
          label: "Geospatial Chart",
          url: "/geospatial-chart",
        },
        {
          icon: "fluent:data-histogram-24-regular",
          label: "Histogram",
          url: "/histogram",
        },
        {
          icon: "mdi:chart-line-variant",
          label: "Line Chart",
          url: "/line-chart",
        },
        {
          icon: "carbon:chart-scatter",
          label: "Scatterplot",
          url: "/scatterplot",
        },
      ],
    },
    {
      sectionHeading: "Utility Classes",
      sectionUrlPrefix: "/docs/utility-classes",
      sectionItems: [
        {
          icon: "bx:show",
          label: "Visibility",
          url: "/visibility",
        },
      ],
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
      {#each mainNav as section}
        <li class="section-heading">{section.sectionHeading}
          <ul class="section-items-list">
            {#each section.sectionItems as item}
              <li class="section-item">
                <a href={`${section.sectionUrlPrefix}${item.url}`} class:active={currentPath === `${section.sectionUrlPrefix}${item.url}`}>
                  <Icon icon={item.icon} style={`rotate: ${item.iconRotate}`} /> 
                  {item.label}
                </a>
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  </nav>
<!-- {/if} -->

<style>
  @media (--xs-up) {
    nav {
      border-top: 2px solid var(--neutral-12);

      & ul {
        margin: 0;
        list-style: none;

        & li {
          margin: 0;
        }
      }

      & .main-nav-list {
        /* The height of the mobile nav menu is 100vh minus the height of the header. */
        height: calc(100vh - 64px);
        display: flex;
        flex-direction: column;
        padding: 0;
        padding-top: 20px;
        overflow-y: auto;
        background-color: var(--primary-bg);

        & .section-heading {
          padding-left: 15px;
          font-size: 1.1rem;
          font-weight: bold;
          color: var(--white);

          & .section-items-list {
            padding-left: 0;
            margin-left: -15px;
            margin-top: 10px;
            margin-bottom: 20px;
            font-size: 1rem;
            font-weight: normal;

            & .section-item {

              & a {
                display: flex;
                align-items: center;
                padding: 12px;
                padding-left: 30px;
                border-bottom: none;
                color: var(--white);
                gap: 10px;

                /* & :global(.iconify) {
                  margin-right: 10px;
                } */

                &:hover, &:active {
                  /* background-color: var(--secondary-bg); */
                  color: var(--tertiary-bg);
                }
              }
            }
          }
        }
      }
    }
  }

  @media (--lg-up) {
    nav {

      & .main-nav-list {
        height: auto;
      }
    }
  }
</style>
