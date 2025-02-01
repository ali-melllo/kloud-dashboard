/*
	"off" or 0 - turn the rule off
	"warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
	"error" or 2 - turn the rule on as an error (exit code will be 1)
*/

module.exports = {
	root: true,
	extends: ['next/core-web-vitals', 'eslint:recommended', 'airbnb'],

	plugins: ['simple-import-sort'],

	rules: {
		'react/no-unstable-nested-components': 0,
		'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
		'react/react-in-jsx-scope': 0,
		'react/jsx-props-no-spreading': 0,
		'react/require-default-props': 0,
		'react/function-component-definition': 0,

		'no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],

		// 'object-curly-newline': ['error', { minProperties: 2 }],

		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'import/no-extraneous-dependencies': [2, { devDependencies: true }],
		'import/no-unresolved': 0,
		'import/prefer-default-export': 0,
		'import/extensions': [2, 'always', {
			js: 'never', jsx: 'never', ts: 'never', tsx: 'never',
		}],

		'arrow-body-style': 0,
		'prefer-arrow-callback': 0,
		'no-nested-ternary': 0,
		'no-throw-literal': 0,

		/*
			Code format rules
			We have disabled prettier because we can do more with eslint itself
		*/
		'prettier/prettier': 0,
		indent: ['error', 'tab'],
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'no-tabs': 'off',
		'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
		'arrow-parens': ['error', 'as-needed'],
		'comma-dangle': ['error', 'always-multiline'],

		'jsx-a11y/alt-text': 0,
	},

	// settings: {
	// 	'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
	// 	'import/parsers': {
	// 		'@typescript-eslint/parser': ['.ts', '.tsx'],
	// 	},
	// 	'import/resolver': {
	// 		typescript: {
	// 			directory: './tsconfig.json',
	// 		},
	// 		node: {
	// 			extensions: ['.js', '.jsx', '.ts', '.tsx'],
	// 		},
	// 	},
	// },

	overrides: [
		// {
		// 	files: ['*.ts', '*.tsx'],
		// 	rules: {
		// 		'no-undef': 'off',
		// 	},
		// },
		{
			files: ['*.js', '*.jsx', '*.ts', '*.tsx'],

			rules: {
				'simple-import-sort/imports': [
					'error',
					{
						groups: [
							// Side effect imports.
							['^\\u0000'],

							// Packages `react` related packages come first.
							['^react', '^@?\\w'],
							['^(@refinedev)(/.*|$)'],
							['^(@/providers)(/.*|$)'],
							['^(@/store)(/.*|$)'],
							['^(@/services)(/.*|$)'],
							['^(@/lib|@/configs)(/.*|$)'],
							['^(|@/i18n)(/.*|$)'],
							['^(|@/registry)(/.*|$)'],
							['^(|@/components)(/.*|$)'],

							// Parent imports. Put `..` last.
							['^\\.\\.(?!/?$)', '^\\.\\./?$'],
							// Other relative imports. Put same-folder imports and `.` last.
							['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
							// Style imports.
							['^.+\\.?(css)$'],
						],
					},
				],
			},
		},
		{
			files: ['*.test.tsx', '*.test.ts'],
			rules: {
				'simple-import-sort/imports': 0,
				'simple-import-sort/exports': 0,
			},
		},
	],
};
