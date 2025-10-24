import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";
// import checker from "vite-plugin-checker";

export default defineConfig({
	server: {
		port: 3000,
	},
	// build: {
	// 	// Set `minify` to `false` to troubleshoot `error during build: undefined`.
  //   minify: false,
  // },
	plugins: [
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
