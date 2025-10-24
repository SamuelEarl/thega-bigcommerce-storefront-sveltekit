<script lang="ts" module>
  interface IToastMsg {
    type: string;
    msg: string;
  }
  
  let toastMsg: IToastMsg | null = $state(null);
  let timeoutID: number = $state(-1);
  const duration: number = 7000; // Set this variable to any number or Infinity.

  /**
   * Clear any previous timeouts otherwise you could get inconsistent timers.
   * https://stackoverflow.com/a/1472717/9453009
   */
  export function setToastMsg(msg: IToastMsg | null) {
    try {
      // Clear any previous timeouts.
      clearTimeout(timeoutID);
      // Set the toastMsg.
      toastMsg = msg;

      // If the duration is `Infinity`, then return without clearing the toast. The user will have to close the toast by clicking the "x".
      if (duration === Infinity) {
        return;
      }
      // If the duration is a number other than Infinity, then clear the toast after the duration has lapsed.
      else {
        // Set a new timeout and pass the return value to `timeoutID`.
        timeoutID = setTimeout(() => {
          toastMsg = null;
        }, duration);
      }
    }
    catch(err) {
      console.error("setToastMsg", err);
    }
  }
</script>

{#if toastMsg}
  <div class={`fp-toast ${toastMsg?.type}`}>
    <div class="msg">
      {toastMsg?.msg}
    </div>
    <button
      class="close"
      onclick={() => {
        clearTimeout(timeoutID);
        setToastMsg(null);
      }}
      onkeyup={() => {
        clearTimeout(timeoutID);
        setToastMsg(null);
      }}
    >
      &times;
    </button>
  </div>
{/if}


<style>
  @media (--xs-up) {
    .fp-toast {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10000;
      display: flex;

      &.info {
        background-color: var(--info-bg);  
        color: var(--info-fg);
      }

      &.success {
        background-color: var(--success-bg);
        color: var(--success-fg);
      }
      
      &.warning {
        background-color: var(--warning-bg);
        color: var(--warning-fg);
      }

      &.error {
        background-color: var(--error-bg);
        color: var(--error-fg);
      }

      & .msg {
        flex: 1;
        padding: 20px;
      }

      & .close {
        width: 50px;
        font-size: 2rem;
        font-weight: normal;
        display: flex;
        justify-content: center;
        padding-top: 10px;
        cursor: pointer;

        &:hover {
          font-weight: bold;
        }
      }
    }
  }

  @media (--lg-up) {
    .fp-toast {
      font-size: 1.1rem;
    }
  }
</style>
