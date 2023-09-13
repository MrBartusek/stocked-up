module.exports = {
	env: {
		'browser': true,
		'es2021': true,
		'node': true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	overrides: [
	],
	ignorePatterns: [ '*.html' ],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	plugins: [
		'react',
		'@typescript-eslint'
	],
	settings: {
		react: {
			version: 'detect'
		}
	},
	rules: {
		'brace-style': [ 'error', 'stroustrup', { 'allowSingleLine': true } ],
		'quotes': [ 'error', 'single' ],
		'no-trailing-spaces': [ 'error' ],
		'eol-last': [ 'error', 'always' ],
		'curly': [ 'error', 'multi-line', 'consistent' ],
		'indent': [ 'error', 'tab', { 'SwitchCase': 1, 'ignoredNodes': [ 'TemplateLiteral *' ] } ],
		'semi': [ 'error', 'always' ],
		'no-multiple-empty-lines': [ 'error', { 'max': 1 } ],
		'comma-dangle': [ 'error', 'never' ],
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-this-alias': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'array-bracket-spacing': [ 'error', 'always' ]
	}
};