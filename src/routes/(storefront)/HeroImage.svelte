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
    <Link href="#home" variant="secondary" underline={false}>
      <Icon icon="material-symbols:arrow-cool-down" />
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
        background-image: url("/src/lib/client/assets/images/hero-image-optimized-xs-standard-res-768x800.webp");
      }
    }

    @media (--high-res) {
      .hero-image-container {
        background-image: url("/src/lib/client/assets/images/hero-image-optimized-xs-high-res-1536x1600.webp");
      }
    }

    .hero-image-container {
      /* The height of the hero image is 100vh - the height of the <header> element. */
      height: calc(100vh - 59px);
      background-repeat: no-repeat;
      background-position: top right 40%;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: relative;

      & .hero-content-container {
        text-align: center;
        padding: 15px;
        padding-bottom: 20px;
        color: var(--old-gold);

        & .hero-content {
          padding: 10px;
          padding-bottom: 20px;
          background-color: rgba(0, 0, 0, 0.45);

          h1 {
            font-size: var(--size-9);
            font-weight: bold;
            margin: 0;
            margin-bottom: var(--size-4);
          }

          p {
            font-size: var(--size-5);
            margin-bottom: var(--size-5);
          }

          .cta {
            display: flex;
            justify-content: center;
          }
        }
      }

      & .icon-container {
        position: absolute;
        bottom: 0px;
        right: 0;
        color: var(--white);
        animation: bounce 3s ease infinite;

        & :global(.icon--material-symbols.icon--material-symbols--arrow-cool-down) {
          font-size: var(--size-15);
        }
      }
    }
  }

  @media (--md-up) {
    @media (--standard-res) {
      .hero-image-container {
        background-image: url("/src/lib/client/assets/images/hero-image-optimized-md-standard-res-1280x1280.webp");
      }
    }

    @media (--high-res) {
      .hero-image-container {
        background-image: url("/src/lib/client/assets/images/hero-image-optimized-md-high-res-2560x2560.webp");
      }
    }

    .hero-image-container {
      background-position: top center;

      & .hero-content-container {
        padding-bottom: 120px;

        & .hero-content {

          h1 {
            font-size: var(--size-12);
            margin-bottom: var(--size-5);
          }

          p {
            font-size: var(--size-6);
            margin-bottom: var(--size-7);
          }
        }
      }

      & .icon-container {
        /* To place the icon in the center of the screen, calculate half the width of the icon and subtract that from 50vw. */
        left: calc(50vw - (var(--size-20) / 2));

        & :global(.icon--material-symbols.icon--material-symbols--arrow-cool-down) {
          font-size: var(--size-20);
        }
      }
    }
  }

  @media (--xl-up) {
    @media (--standard-res) {
      .hero-image-container {
        background-image: url("/src/lib/client/assets/images/hero-image-optimized-xl-standard-res-2000x800.webp");
      }
    }

    @media (--high-res) {
      .hero-image-container {
        background-image: url("/src/lib/client/assets/images/hero-image-optimized-xl-high-res-4000x1600.webp");
      }
    }

    .hero-image-container {
      /* The height of the hero image is 100vh - the height of the <header> element. */
      height: calc(100vh - 62px);
      flex-direction: row;
      align-items: flex-end;

      & .hero-content-container {

        & .hero-content {
          background-color: rgba(0, 0, 0, 0.15);
        }
      }
    }
  }
</style>
