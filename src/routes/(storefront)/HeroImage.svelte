<script lang="ts">
	import { Icon, Link } from "$lib/client/components";
</script>

<div class="hero-image-container">
  <div class="hero-content-container">
    <div class="hero-content">
      <h1>THE GAME IS LIFE</h1>
      <p>
        For those who live and breathe sports and fitness&mdash;
        <br>
        <em><strong>THE GAME IS LIFE,</strong></em>
        <br>
        and our gear powers every step forward.
      </p>
      <div class="cta">
        <Link
          href="/shop"
          btnStyles
          variant="tertiary"
        >
          SHOP NOW
        </Link>
      </div>
    </div>
  </div>
  <div class="icon-container">
    <Link href="#content-start" variant="secondary" underline={false}>
      <Icon icon="material-symbols:arrow-cool-down" style="font-size: var(--size-20);" />
    </Link>
  </div>
</div>

<style>
  @keyframes bounce {
    0% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0px);
    }
  }

  @media (--xs-up) {
    @media (--standard-res) {
      .hero-image-container {
        background-image: url("src/lib/client/assets/images/hero-image-optimized-xs-standard-res-768x800.webp");
      }
    }

    @media (--high-res) {
      .hero-image-container {
        background-image: url("src/lib/client/assets/images/hero-image-optimized-xs-high-res-1536x1600.webp");
      }
    }

    .hero-image-container {
      width: 100%;
      background-repeat: no-repeat;
      /* background-attachment: fixed; */
      background-position: top center;
      background-size: cover;
      /* margin-bottom: 20px; */
      display: flex;
      justify-content: end;
      align-items: center;
      position: relative;

      & .hero-content-container {
        margin-top: 160px;
        text-align: center;
        padding: 15px;
        padding-bottom: 20px;
        color: var(--old-gold);

        & .hero-content {
          padding: 10px;
          padding-bottom: 20px;
          background-color: rgba(0, 0, 0, 0.45);

          h1 {
            font-size: var(--size-10);
            font-weight: bold;
            margin: 0;
          }

          p {
            font-size: var(--size-5);
          }

          .cta {
            display: flex;
            justify-content: center;
          }
        }
      }

      & .icon-container {
        display: none;
        /* position: absolute;
        bottom: 20px;
        To place the icon in the center of the screen, calculate half the width of the icon and subtract that from 50vw.
        left: calc(50vw - (var(--size-20) / 2));
        color: var(--white);
        Name, duration, timing, iteration count
        animation: bounce 3s ease infinite; */
      }
    }
  }

  @media (--md-up) {
    @media (--standard-res) {
      .hero-image-container {
        background-image: url("src/lib/client/assets/images/hero-image-optimized-md-standard-res-1280x1280.webp");
      }
    }

    @media (--high-res) {
      .hero-image-container {
        background-image: url("src/lib/client/assets/images/hero-image-optimized-md-high-res-2560x2560.webp");
      }
    }
  }

  @media (--xl-up) {
    @media (--standard-res) {
      .hero-image-container {
        background-image: url("src/lib/client/assets/images/hero-image-optimized-xl-standard-res-2000x800.webp");
      }
    }

    @media (--high-res) {
      .hero-image-container {
        background-image: url("src/lib/client/assets/images/hero-image-optimized-xl-high-res-4000x1600.webp");
      }
    }

    .hero-image-container {
      /* The height of the hero image is 100vh - the height of the <header> element. */
      height: calc(100vh - 62px);
      background-repeat: no-repeat;
      /* background-attachment: fixed; */
      background-position: top center;
      background-size: cover;
      margin-bottom: 20px;
      display: flex;
      justify-content: end;
      align-items: center;
      position: relative;

      & .hero-content-container {
        margin-right: 100px;
        text-align: center;
        padding: 20px;
        /* background-color: rgba(0, 0, 0, 0.2); */
        color: var(--old-gold);

        h1 {
          font-size: var(--size-11);
          font-weight: bold;
        }

        p {
          font-size: var(--size-6);
        }

        .cta {
          display: flex;
          justify-content: center;
        }
      }

      & .icon-container {
        display: block;
        position: absolute;
        bottom: 20px;
        /* To place the icon in the center of the screen, calculate half the width of the icon and subtract that from 50vw. */
        left: calc(50vw - (var(--size-20) / 2));
        color: var(--white);
        /* Name, duration, timing, iteration count */
        animation: bounce 3s ease infinite;
      }
    }
  }
</style>
