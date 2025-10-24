// import { createHighlighter } from "shiki";
import { escapeSvelte } from "mdsvex";

/** @type {import("mdsvex").MdsvexOptions} */
const config = {
	extensions: [".svelte.md", ".md", ".svx"],

	// TODO: I am getting this error with Shiki:
	// 40 instances have been created. Shiki is supposed to be used as a singleton, consider refactoring your code to cache your highlighter instance; Or call `highlighter.dispose()` to release unused instances.
	// highlight: {
	// 	highlighter: async (code, lang = "text") => {
	// 		const highlighter = await createHighlighter({
	// 			themes: ["poimandres"],
	// 			langs: ["javascript", "typescript", "svelte", "html"]
	// 		});
	// 		await highlighter.loadLanguage("javascript", "typescript", "svelte", "html");
	// 		const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: "poimandres" }));
	// 		return `{@html \`${html}\` }`;
	// 	}
	// },
	
	smartypants: {
		dashes: "oldschool"
	},

	remarkPlugins: [],
	rehypePlugins: []
};

export default config;
