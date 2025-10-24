// This script file and instructions for using CSS icons are found here:
// https://iconify.design/docs/usage/css/utils/

// To update the CSS icons, run `bun --bun generate-css-icons.js` from the root directory or `make generate-css-icons`. This will update the `src/lib/client/assets/styles/icons.css` file.

// To use those icons in HTML, pass the `icon-set:icon-name` string (from Iconify) to the custom <Icon /> component in the `src/lib/client/components` folder.
// You can also use individual <span> elements with two class names: class name for the icon set, class name for the icon.
// <span class="icon--mdi-light icon--mdi-light--alert-circle"></span>

import { readFile, writeFile } from "node:fs/promises";
import { getIconsCSS } from "@iconify/utils";
import { locate } from "@iconify/json";

(async function () {
  /**
   * List of icons. Key is icon set prefix, value is array of icons
   *
   * @type {Record<string, string[]>}
   */
  const icons = {
    "bi": [
      "bar-chart",
      "gear-wide-connected",
      "textarea-resize",
    ],
    "bx": [
      "calculator",
      "show",
      "spreadsheet",
    ],
    "carbon": [
      "account",
      "button-centered",
      "calendar",
      "chart-bubble",
      "chat",
      "checkbox-checked",
      "currency-dollar",
      "home",
      "information-square",
      "label",
      "list-boxes",
      "play",
      "popup",
      "radio-button-checked",
      "chart-scatter",
      "user-profile",
    ],
    "clarity": [
      "color-picker-solid",
    ],
    "entypo": [
      "info-with-circle",
    ],
    "eos-icons": [
			"admin-outlined",
    ],
    "fa": [
      "send",
    ],
    "fluent": [
      "data-histogram-24-regular",
      "multiselect-ltr-20-filled",
    ],
    "game-icons": [
      "save-arrow",
    ],
    "gis": [
      "world-map-alt",
    ],
    "ic": [
      "baseline-home",
      "baseline-update",
      "outline-tab",
    ],
    "icomoon-free": [
      "spinner2",
    ],
    "icon-park-outline": [
      "list-view",
    ],
    "ion": [
      "save-sharp",
    ],
    "material-symbols": [
      "style-outline-sharp",
      "table-outline-sharp",
    ],
    "material-symbols-light": [
      "clock-loader-40",
    ],
    "mdi": [
      "calendar",
      "cancel",
      "chart-finance",
      "chart-line-variant",
      "check",
      "close",
      "feature-highlight",
      "handcuffs",
      "letter-i-box-outline",
      "menu",
    ],
    "octicon": [
      "goal-24",
    ],
    "ph": [
      "layout-light",
    ],
    "pixelarticons": [
      "drop-area",
    ],
    "radix-icons": [
      "input",
    ],
    "ri": [
      "account-circle-line",
      "bank-line",
      "delete-bin-2-line",
      "download-cloud-2-line",
      "link",
      "login-circle-line",
      "logout-circle-line",
      "settings-3-line",
      "time-line",
    ],
    "tabler": [
      "chart-area-line",
    ],
  };

  // Parse each icon set
  let code = "";
  for (const prefix in icons) {
    // Find location of .json file
    const filename = locate(prefix);

    // Load file and parse it
    /** @type {import("@iconify/types").IconifyJSON} */
    const iconSet = JSON.parse(await readFile(filename, "utf8"));

    // Get CSS
    const css = getIconsCSS(iconSet, icons[prefix]);

    // Add it to code
    code += css;
  }

  // Save CSS file
  await writeFile("src/lib/client/assets/styles/icons.css", code, "utf8");
  console.log(`Saved CSS (${code.length} bytes)`);
})();
