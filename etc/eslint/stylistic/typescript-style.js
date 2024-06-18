import {javascriptStyle} from './javascript-style.js';

const overrideRules = [
  'block-spacing',
  'brace-style',
  'comma-dangle',
  'comma-spacing',
  'function-call-spacing',
  'indent',
  'key-spacing',
  'keyword-spacing',
  'lines-around-comment',
  'lines-between-class-members',
  'no-extra-parens',
  'no-extra-semi',
  'object-curly-spacing',
  'quote-props',
  'quotes',
  'semi',
  'space-before-blocks',
  'space-before-function-paren',
  'space-infix-ops',
];

const disableJsStyleRules = {};
const rules = {};

for (const rule of overrideRules) {
  const prevOptions = javascriptStyle[rule].slice(1);

  disableJsStyleRules[rule] = ['off'];

  rules[rule] = ['error', ...prevOptions];
}

rules['member-delimiter-style'] = [
  'error',
  {
    multiline: {
      delimiter: 'semi',
      requireLast: true,
    },
    singleline: {
      delimiter: 'semi',
      requireLast: true,
    },
    multilineDetection: 'brackets',
  },
];

rules['type-annotation-spacing'] = [
  'error',
  {
    before: false,
    after: true,
  },
];

export {
  disableJsStyleRules,
  rules,
};
