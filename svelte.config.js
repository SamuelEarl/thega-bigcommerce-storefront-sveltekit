// import adapter from "@sveltejs/adapter-auto";
import adapter from "svelte-adapter-bun";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { sveltePreprocess } from "svelte-preprocess";
import postcssGlobalData from "@csstools/postcss-global-data";
import postcssPresetEnv from "postcss-preset-env";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	extensions: [".svelte", ...mdsvexConfig.extensions],
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		// The order of preprocessors matters:
		// https://svelte.dev/docs/v4-migration-guide#preprocessors
		
		// IMPORTANT: mdsvex needs to come first or it will throw SSR errors.
		// See https://github.com/pngwn/MDsveX/issues/515#issuecomment-1612983543.
		mdsvex(mdsvexConfig),
		vitePreprocess(),
		// You need to also configure the `svelte-preprocess` plugin:
		// https://kit.svelte.dev/docs/integrations#preprocessors-svelte-preprocess
		sveltePreprocess({
			postcss: {
				plugins: [
					// Configure the `@custom-media` queries through the `@csstools/postcss-global-data` plugin.
					// See https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media
					postcssGlobalData({
						files: ["src/lib/client/assets/styles/media-queries.css"],
					}),
					// * Configure nesting rules through the postcssPresetEnv plugin:
					// https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env
					// * How to configure the postcssPresetEnv plugin:
					// https://github.com/zamkevich/Svelte-preprocess-config/blob/master/README.md
					// * Disable "Svelte plugin CSS diagnostics" and install the "PostCSS Language Support" extension in VS Code to prevent false error highlighting:
					// https://www.ryanfiller.com/blog/tips/svelte-postcss-syntax-highlighting
					postcssPresetEnv({
						stage: 2,
						features: { "nesting-rules": true },
						browsers: "last 2 versions",
					}),
				],
			},
		}),
	],
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
	},
};

export default config;
