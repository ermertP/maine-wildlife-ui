// Use CommonJS syntax to avoid TypeScript issues with ES modules
const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const pluginReact = require('eslint-plugin-react');
const pluginPrettier = require('eslint-plugin-prettier');

module.exports = {
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      languageOptions: {
        globals: globals.browser,  // For browser-specific globals (like window)
      },
      plugins: {
        js,
        tseslint,
        pluginReact,
        prettier: pluginPrettier,
      },
      extends: [
        'js/recommended',  // Base ESLint JS rules
        tseslint.configs.recommended,  // TypeScript ESLint rules
        pluginReact.configs.flat.recommended,  // React plugin rules
        'plugin:prettier/recommended',  // Prettier integration
      ],
      rules: {
        'react/react-in-jsx-scope': 'off',  // React 17+ doesn't require React in scope anymore
        'react/no-unescaped-entities': 'off',  // Optional: you can disable unescaped entities rule
        'no-undef': 'off',  // Allow undefined variables like process and __dirname
      },
    },
  ],
};
