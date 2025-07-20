import js from '@eslint/js';
import { globalIgnores } from 'eslint/config'
import { configs as tsConfigs } from 'typescript-eslint';
import globals from 'globals';

const config = [
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser
			}
		}
	},
	globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),
	js.configs.recommended,
	...tsConfigs.recommended,
	{
		files: ['**/*.js', '**/*.ts'],
		rules: {
			indent: ['warn', 'tab']
		}
	}
];

export default config;
