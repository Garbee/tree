// @ts-check
import stylisticJs from '@stylistic/eslint-plugin-js';
import packageJson from 'eslint-plugin-package-json/configs/recommended';
import {possibleProblems} from './etc/eslint/rules/possible-problems.js';
import {suggestions} from './etc/eslint/rules/suggestions.js';
import {javascriptStyle} from './etc/eslint/stylistic/javascript-style.js';

const prependToKeys = function prependToKeys(obj, prefix) {
  const newObj = {};
  for (const key of Object.keys(obj)) {
    newObj[prefix + key] = obj[key];
  }
  return newObj;
};

const jsStyleRules = prependToKeys(javascriptStyle, '@stylistic/js/');

export default [
  {
    name: 'configs',
    files: ['eslint.config.js', 'etc/**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
    },
    plugins: {
      '@stylistic/js': stylisticJs,
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
];
