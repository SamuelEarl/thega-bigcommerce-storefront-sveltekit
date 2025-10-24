<script lang="ts">
  import { Button, Input } from "$lib/client/components";

  let {
    demoLogin,
    cancel,
    loginEmail = $bindable(),
    disabled,
  } = $props();
</script>


<div id="login-form">
  <div id="left">
    <div id="logo-container">
      <div>Fanny</div>
      <div>Pack</div>
      <div>UI</div>
    </div>
  </div>

  <div id="right">
    <div id="top">
      <h1 id="welcome">Welcome to</h1>
      <h1 id="title">Fanny Pack UI</h1>
    </div>
    <div id="bottom">
      <p>This login form won't actually log you into anything</p>
      <p>It's just for demonstration purposes</p>
      <br>
      <form onsubmit={demoLogin}>
        <div>
          <Input
            type="email"
            bind:value={loginEmail}
            placeholder="Enter your email"
            {disabled}
          />
        </div>
        <br>
        <Button
          type="submit"
          icon="ri:login-circle-line"
          width="full"
          {disabled}
        >
          Login
        </Button>
      </form>
      <br>
      <div>
        <button
          class="link-styles primary"
          onclick={cancel}
          onkeydown={cancel}
          {disabled}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>


<style>
  #login-form {
    display: flex;
    height: 500px;

    & #left, & #right {
      display: flex;
      padding: 40px;
    }

    & #left {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      border-radius: var(--radius) 0 0 var(--radius);
      background-color: var(--dark-purple);
      font-family: var(--cursive);
      font-size: 3rem;
      line-height: 1.5;
      color: var(--white);

      & #logo-container {
        text-align: center;
      }
    }

    & #right {
      flex: 3;
      height: 100%;
      flex-direction: column;
      border-radius: 0 var(--radius) var(--radius) 0;
      background-color: var(--white);

      & #top {
        flex: 1;
        display: flex;
        flex-direction: column;

        & h1 {
          font-weight: 100;
          text-align: center;

          &#welcome {
            margin: 0;
            font-size: 1.5rem;
          }

          &#title {
            margin-top: 0;
            font-size: 2.5rem;
          }
        }
      }
      & #bottom {
        flex: 1;
        text-align: center;
      }
    }
  }
</style>
