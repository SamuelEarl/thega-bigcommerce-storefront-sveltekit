<script lang="ts">
	import { Link } from "$lib/client/components";
  import LogoBlack from "$lib/client/assets/images/logo-and-name-horizontal-black-191919.svg";

  const footerColumns = [
    {
      heading: "MEN",
      items: [
        { label: "Shoes", link: "/men/shoes" },
        { label: "Clothing", link: "/men/clothing" },
        { label: "Accessories", link: "/men/accessories" },
      ]
    },
    {
      heading: "WOMEN",
      items: [
        { label: "Shoes", link: "/women/shoes" },
        { label: "Clothing", link: "/women/clothing" },
        { label: "Accessories", link: "/women/accessories" },
      ]
    },
    {
      heading: "BOYS",
      items: [
        { label: "Shoes", link: "/boys/shoes" },
        { label: "Clothing", link: "/boys/clothing" },
        { label: "Accessories", link: "/boys/accessories" },
      ]
    },
    {
      heading: "GIRLS",
      items: [
        { label: "Shoes", link: "/girls/shoes" },
        { label: "Clothing", link: "/girls/clothing" },
        { label: "Accessories", link: "/girls/accessories" },
      ]
    },
    {
      heading: "COMPANY INFO",
      items: [
        { label: "About Us", link: "/about-us" },
        { label: "Contact Us", link: "/" },
        { label: "Shipping & Delivery Policies", link: "/" },
        { label: "Returns, Exchanges, Refunds", link: "/" },
        { label: "FAQ", link: "/" },
        { label: "Privacy Policy", link: "/" },
        { label: "Terms of Service", link: "/" },
      ]
    },
  ];
</script>

<footer class="footer-top">
  <nav class="footer-top-content">
    {#each footerColumns as column}
      <ul>
        <li><h5>{column.heading}</h5></li>
        {#each column.items as item}
          <li>
            <Link href={item.link}>{item.label}</Link>
          </li>
        {/each}
      </ul>
    {/each}
  </nav>
</footer>
<footer class="footer-bottom">
  <div class="footer-bottom-content">
    <div class="logo-wrapper">
      <a href="/"><img src={LogoBlack} class="logo" alt="logo" /></a>
    </div>
    <div class="copyright-wrapper">
      &copy; {new Date().getFullYear()} THEGA
    </div>
  </div>
</footer>

<style>
  @media (--xs-up) {
    footer {
      padding: 20px 0 30px 0;
      background-color: var(--neutral-3);

      & .footer-top-content, & .footer-bottom-content {
        max-width: var(--sm-max);
        margin: 0 auto;
        padding: 0 15px;
        display: flex;
        flex-direction: column;
      }
    }

    footer.footer-top {
      border-bottom: 1px solid var(--white);

      & .footer-top-content {

        & ul {
          list-style-type: none;
          padding: 0;

          & li {

            & h5 {
              font-size: var(--size-4);
              font-weight: bold;
            }
          }
        }
      }
    }

    footer.footer-bottom {
      padding-top: 40px;

      & .footer-bottom-content {
        gap: var(--size-4);

        & .logo-wrapper {

          & .logo {
            height: 35px;
          }
        }
      }
    }
  }

  @media (--md-up) {
    footer {

      & .footer-top-content, & .footer-bottom-content {
        max-width: var(--lg-max);
        flex-direction: row;
        gap: 20px;
      }
    }

    footer.footer-top {

      & .footer-top-content {
        justify-content: space-around;
      }
    }

    footer.footer-bottom {

      & .footer-bottom-content {
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  @media (--xl-up) {
    footer {

      &.footer-bottom {
        padding-top: 30px;
      }

      & .footer-top-content, & .footer-bottom-content {
        max-width: var(--xl-max);
      }
    }
  }
</style>
