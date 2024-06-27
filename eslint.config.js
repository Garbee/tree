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
    ignores: [
      'dist/**/*',
      'man/**/*',
      'test-results/**/*',
      'tests/srv/assets/**/*',
    ],
  },
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
      'max-lines': ['off'],
    },
  },
  {
    ...packageJson,
    rules: {
      ...packageJson.rules,
      'package-json/sort-collections': [
        'error',
        [
          'devDependencies',
          'dependencies',
          'peerDependencies',
          'config',
        ],
      ],
    },
  },
  {
    name: 'code',
    files: ['src/**/*.ts', 'tests/**/*.ts'],
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
  {
    name: 'Tests',
    files: ['tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-magic-numbers': ['off'],
      '@typescript-eslint/no-unsafe-assignment': ['off'],
      'max-lines-per-function': ['off'],
      'no-await-in-loop': ['off'],
      'max-nested-callbacks': [
        'error',
        {
          max: 5,
        },
      ],
    },
  },
  {
    /**
     * The tree is the powerhouse component. There is a lot
     * of code to make it work to manage everything. So,
     * some specific overrides are necessary.
     */
    name: 'Tree specific overrides',
    files: ['src/tree.ts'],
    rules: {
      'max-lines': ['off'],
      'complexity': [
        'error',
        {
          max: 15,
        },
      ],
      'max-lines-per-function': [
        'error',
        {
          max: 75,
        },
      ],
    },
  },
];
