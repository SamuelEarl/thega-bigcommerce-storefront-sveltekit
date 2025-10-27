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
    "material-symbols": [
      "search",
      "person-outline",
      "shopping-bag-outline-sharp",
      "arrow-cool-down",
      "menu",
      "close",
      "chevron-left",
      "chevron-right",
      "save-outline-sharp",
    ],
    "gg": [
      "spinner-two-alt",
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
