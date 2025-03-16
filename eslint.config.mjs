// SPDX-License-Identifier: CC0-1.0

import eslintJs from "@eslint/js";
import stylistic from '@stylistic/eslint-plugin';
import typescriptEslint from "typescript-eslint";

const ERROR = "error";
const OFF = "off";

export default typescriptEslint.config([{
	files: ["src/**/*.{ts,js,mjs}"],

	languageOptions: {
		ecmaVersion: 2020,

		parserOptions: {
			projectService: true,
			tsconfigRootDir: import.meta.dirname,
		},
	},

	extends: [
		eslintJs.configs.recommended,
		...typescriptEslint.configs.recommendedTypeChecked,
		...typescriptEslint.configs.strictTypeChecked,
		...typescriptEslint.configs.stylisticTypeChecked,
		stylistic.configs.customize({
			indent: "tab",
			quotes: "double",
			semi: true,
			arrowParens: true,
		}),
	],

	rules: {
		"@stylistic/no-extra-semi": ERROR,
		"@stylistic/spaced-comment": [ERROR, "always", { line: { markers: ["#region", "#endregion"] } }],
		"@typescript-eslint/naming-convention": ERROR,
		"@typescript-eslint/strict-boolean-expressions": ERROR,
		"curly": ERROR,
		"eqeqeq": ERROR,
		"no-constant-condition": OFF, // Covered by @typescript-eslint/no-unnecessary-condition
		"no-inner-declarations": ERROR,
	},
}]);
