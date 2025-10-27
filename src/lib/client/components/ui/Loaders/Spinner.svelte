<script lang="ts">
  interface Props {
    spinnerSize?: number;
    msg?: string;
    msgFontSize?: string;
    msgIsAboveSpinner?: boolean;
  }

  let {
    spinnerSize = 60,
    msg = "",
    msgFontSize = "2.5rem",
    msgIsAboveSpinner = false
  }: Props = $props();
</script>

<div class="loading-wrapper">
  {#if msg && msgIsAboveSpinner}
    <div class="loading-message-above" style={`font-size: ${msgFontSize};`}>{msg}</div>
  {/if}
  <div>
    <!--
      How to change the icon.
      This is how to copy the SVG code of an icon so it loads quickly in your app.

      1. Go to https://icon-sets.iconify.design/ and search for the icon you want.
      2. Click on the icon to open its details page.
      3. Click on the "SVG" tab to view the SVG code.
      4. Copy the SVG code.
      5. Paste the SVG code below.

      Or
      1. In Chrome, find an SVG image that you want to use.
      2. Inspect the SVG element with DevTools (right-click on the SVG element >> Inspect).
      3. In DevTools, right-click on the <svg> element.
      4. Select "Copy" >> "Copy element".
      5. Paste the SVG code below.

      6. Replace the width and height attributes in the <svg> element with width={spinnerSize} height={spinnerSize}
      7. Add class="fp-spin" to the <svg> element to apply the spinning animation.
    -->

    <!-- This is the "gg:spinner-two-alt" icon from the css.gg icon set in Iconify. -->
    <svg xmlns="http://www.w3.org/2000/svg" width={spinnerSize} height={spinnerSize} viewBox="0 0 24 24">
      <path fill="currentColor" d="M12 22c5.523 0 10-4.477 10-10h-3a7 7 0 0 1-7 7zM2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z"/>
    </svg>

    <!-- This is the "icomoon-free:spinner2" icon from the Icomoon Free icon set in Iconify. -->
    <!-- <svg xmlns="http://www.w3.org/2000/svg" width={spinnerSize} height={spinnerSize} class="fp-spin" viewBox="0 0 16 16">
      <path fill="currentColor" d="M16 8a7.92 7.92 0 0 0-2.431-5.568A7.78 7.78 0 0 0 5.057.896c-.923.405-1.758.992-2.449 1.712S1.371 4.182 1.011 5.105a7.53 7.53 0 0 0 .115 5.742c.392.892.961 1.7 1.658 2.368S4.307 14.41 5.2 14.758a7.3 7.3 0 0 0 2.799.493a7.16 7.16 0 0 0 6.526-4.547a7 7 0 0 0 .415-1.622l.059.002a1 1 0 0 0 .996-1.083h.004zm-1.589 2.655c-.367.831-.898 1.584-1.55 2.206s-1.422 1.112-2.254 1.434a6.8 6.8 0 0 1-2.608.454a6.68 6.68 0 0 1-4.685-2.065a6.6 6.6 0 0 1-1.38-2.173a6.5 6.5 0 0 1 .116-4.976c.342-.77.836-1.468 1.441-2.044s1.321-1.029 2.092-1.326a6.27 6.27 0 0 1 4.784.116c.74.329 1.41.805 1.963 1.387s.988 1.27 1.272 2.011a6 6 0 0 1 .397 2.32h.004a1 1 0 0 0 .888 1.077a7 7 0 0 1-.481 1.578z"/>
    </svg> -->
  </div>

  {#if msg && !msgIsAboveSpinner}
    <div class="loading-message-below" style={`font-size: ${msgFontSize};`}>{msg}</div>
  {/if}
</div>

<style>
  .loading-wrapper {
    width: 100%;
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .loading-message-above {
      margin-bottom: 20px;
    }

    & .loading-message-below {
      margin-top: 20px;
    }
  }
</style>
