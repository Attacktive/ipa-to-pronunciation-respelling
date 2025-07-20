import js from "@eslint/js";
import { configs as tsConfigs } from "typescript-eslint";
import globals from "globals";

const config = [
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser
			}
		}
	},
	js.configs.recommended,
	...tsConfigs.recommended,
	{
		files: ["**/*.js", "**/*.ts"],
		rules: {
			indent: ["warn", "tab"]
		}
	}
];

export default config;
