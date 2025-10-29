<script lang="ts">
	import { Icon, Link } from "$lib/client/components";
</script>

<div class="hero-image">
  <div class="hero-content">
    <h1>THE GAME IS LIFE</h1>
    <p>
      For those who live and breathe sports and fitness
      <br>
      <em><strong>THE GAME IS LIFE</strong></em>
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
  <div class="icon-container">
    <Icon icon="material-symbols:arrow-cool-down" style="font-size: var(--size-20);" />
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
    .hero-image {
      /* height: 768px; */
      height: 100vh;
      background-image: url("src/lib/client/assets/images/hero-image-optimized.webp");
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-position: center;
      background-size: cover;
      margin-bottom: 20px;
      display: flex;
      justify-content: end;
      align-items: center;
      position: relative;

      & .hero-content {
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
        position: absolute;
        bottom: 8vh;
        /* To place the icon in the center of the screen, calculate half the width of the icon and subtract that from 50vw. */
        left: calc(50vw - (var(--size-20) / 2));
        color: var(--white);
        animation: bounce 3s ease infinite; /* Name, duration, timing, iteration count */
      }
    }
  }

  @media (--md-up) {

  }

  @media (--xl-up) {

  }
</style>
