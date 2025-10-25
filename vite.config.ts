import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";
// import checker from "vite-plugin-checker";

export default defineConfig({
	server: {
		port: 3000,
	},
	// build: {
	// 	// This throws the following error: 
	// 	// Entry module "src/routes/docs/+layout.svelte" cannot be external.
	// 	rollupOptions: {
	// 		external: (id) => {
  //       // Exclude any module whose path includes "routes/docs".
  //       return id.includes("routes/docs");
  //     }
	// 	}
	// 	// // Set `minify` to `false` to troubleshoot `error during build: undefined`.
  //   // minify: false,
  // },
	plugins: [
		// vite-plugin-checker will add type checking and linting support for Vite during dev and build.
		// This can help troubleshoot errors. See https://vite-plugin-checker.netlify.app/.
		// checker({ typescript: true }),
		sveltekit(),
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: "./vite.config.ts",
				test: {
					name: "client",
					environment: "browser",
					browser: {
						enabled: true,
						provider: "playwright",
						instances: [{ browser: "chromium" }]
					},
					include: ["src/**/*.svelte.{test,spec}.{js,ts}"],
					exclude: ["src/lib/server/**"],
					setupFiles: ["./vitest-setup-client.ts"]
				}
			},
			{
				extends: "./vite.config.ts",
				test: {
					name: "server",
					environment: "node",
					include: ["src/**/*.{test,spec}.{js,ts}"],
					exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"]
				}
			}
		]
	}
});
