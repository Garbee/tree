import stylisticJsPlugin from '@stylistic/eslint-plugin-js';
import stylisticTsPlugin from '@stylistic/eslint-plugin-ts';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import packageJson from 'eslint-plugin-package-json/configs/recommended';
import {possibleProblems} from './etc/eslint/rules/possible-problems.js';
import {suggestions} from './etc/eslint/rules/suggestions.js';
import {javascriptStyle} from './etc/eslint/stylistic/javascript-style.js';
import {
  disableRootRules,
  typescriptRules,
} from './etc/eslint/typescript.js';
import {
  disableJsStyleRules,
  rules as stylisticTs,
} from './etc/eslint/stylistic/typescript-style.js';

const prependToKeys = function prependToKeys(
  obj,
  prefix,
) {
  const newObj = {};
  for (const key of Object.keys(obj)) {
    newObj[`${prefix}${key}`] = obj[key];
  }
  return newObj;
};

const jsStyleRules = prependToKeys(javascriptStyle, '@stylistic/js/');
const tsRules = {
  ...disableRootRules,
  ...prependToKeys(typescriptRules, '@typescript-eslint/'),
};
const tsStyleRules = {
  ...prependToKeys(disableJsStyleRules, '@stylistic/js/'),
  ...prependToKeys(stylisticTs, '@stylistic/ts/'),
};

export default [
  {
    name: 'configs',
    files: ['eslint.config.js', 'etc/**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@stylistic/js': stylisticJsPlugin,
    },
    rules: {
      ...possibleProblems,
      ...suggestions,
      ...jsStyleRules,
      'no-magic-numbers': ['off'],
      'id-length': ['off'],
    },
  },
  packageJson,
  {
    name: 'code',
    files: ['src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        ...globals.browser,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@stylistic/js': stylisticJsPlugin,
      '@stylistic/ts': stylisticTsPlugin,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...possibleProblems,
      ...suggestions,
      ...jsStyleRules,
      ...tsRules,
      ...tsStyleRules,
    },
  },
];