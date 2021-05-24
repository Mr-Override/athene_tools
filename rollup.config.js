import ts from 'rollup-plugin-ts';
import filesize from "rollup-plugin-filesize";

export default [
	{
		input: "./athene_messenger/index.ts",
		output: {
			file: "dist/athene_messenger/AtheneMessenger.js",
			format: "esm"
		},
		plugins: [ts(), filesize()]
	},
	{
		input: "./athene_manager/index.ts",
		output: {
			file: "dist/athene_manager/AtheneManager.js",
			format: "esm"
		},
		plugins: [ts(), filesize()]
	},
	{
		input: "./athene_builder/index.ts",
		output: {
			file: "dist/athene_builder/AtheneBuilder.js",
			format: "esm"
		},
		plugins: [ts(), filesize()]
	},
	{
		input: "./athene_dom_builds/AtheneBuilder.dom.ts",
		output: {
			file: "dist/athene_dom_builds/AtheneBuilder.dom.js",
			format: "iife"
		},
		plugins: [ts(), filesize()]
	}
]
