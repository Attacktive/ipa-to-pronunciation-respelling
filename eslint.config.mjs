import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export default [
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser
			}
		}
	},
	js.configs.recommended,
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tsParser
		},
		plugins: {
			"@typescript-eslint": tsPlugin
		},
		rules: {
			...tsPlugin.configs.recommended.rules
		}
	},
	{
		rules: {
			"indent": ["warn", "tab", { "MemberExpression": 1 }],
		},
		files: ["**/*.js", "**/*.ts"]
	}
];
