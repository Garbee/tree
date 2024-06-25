const disableRootRules = {
  /* Disable all rules extended from base rules. */
  'class-methods-use-this': ['off'],
  'consistent-return': ['off'],
  'default-param-last': ['off'],
  'dot-notation': ['off'],
  'init-declarations': ['off'],
  'max-params': ['off'],
  'no-array-constructor': ['off'],
  'no-dupe-class-members': ['off'],
  'no-empty-function': ['off'],
  'no-implied-eval': ['off'],
  'no-invalid-this': ['off'],
  'no-loop-func': ['off'],
  'no-magic-numbers': ['off'],
  'no-redeclare': ['off'],
  'no-restricted-imports': ['off'],
  'no-shadow': ['off'],
  'no-unused-expressions': ['off'],
  'no-unused-vars': ['off'],
  'no-use-before-define': ['off'],
  'no-useless-constructor': ['off'],
  'only-throw-error': ['off'],
  'prefer-destructuring': ['off'],
  'prefer-promise-reject-errors': ['off'],
  'require-await': ['off'],
  'return-await': ['off'],
};

const typescriptRules = {
  'adjacent-overload-signatures': ['error'],
  'array-type': [
    'error',
    {
      default: 'generic',
    },
  ],
  'await-thenable': ['error'],
  'ban-ts-comment': ['error'],
  'ban-tslint-comment': ['off'],
  'class-literal-property-style': ['error', 'getters'],
  'class-methods-use-this': [
    'error',
    {
      ignoreOverrideMethods: true,
      ignoreClassesThatImplementAnInterface: true,
    },
  ],
  'consistent-generic-constructors': ['error', 'constructor'],
  'consistent-indexed-object-style': ['error', 'record'],

  /*
   * Favoring `noImplicitReturns` as recommended by the
   * maintainers
   */
  'consistent-return': ['off'],
  'consistent-type-assertions': [
    'error',
    {
      assertionStyle: 'as',
      objectLiteralTypeAssertions: 'allow',
    },
  ],
  'consistent-type-definitions': ['error', 'interface'],
  'consistent-type-exports': [
    'error',
    {
      fixMixedExportsWithInlineTypeSpecifier: false,
    },
  ],
  'consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      disallowTypeAnnotations: true,
      fixStyle: 'inline-type-imports',
    },
  ],
  'default-param-last': ['error'],
  'dot-notation': ['error'],
  'explicit-function-return-type': ['error'],
  'explicit-member-accessibility': ['error'],
  'explicit-module-boundary-types': ['error'],
  'init-declarations': ['off'],
  'max-params': [
    'error',
    {
      max: 3,
    },
  ],
  'member-ordering': ['off'],
  'method-signature-style': ['error', 'property'],

  /**
   * Complex to configure. Might be available in stylistic.
   */
  'naming-convention': ['off'],
  'no-array-constructor': ['error'],
  'no-array-delete': ['error'],
  'no-base-to-string': ['error'],
  'no-confusing-non-null-assertion': ['error'],
  'no-confusing-void-expression': ['error'],

  /**
   * Typescript checks this internally.
   */
  'no-dupe-class-members': ['off'],
  'no-duplicate-enum-values': ['error'],
  'no-duplicate-type-constituents': ['error'],
  'no-dynamic-delete': ['error'],
  'no-empty-function': ['error'],

  /**
   * Deprecated for no-empty-object-type instead.
   */
  'no-empty-interface': ['off'],
  'no-empty-object-type': ['error'],
  'no-explicit-any': [
    'error',
    {
      fixToUnknown: true,
    },
  ],
  'no-extra-non-null-assertion': ['error'],
  'no-extraneous-class': ['error'],
  'no-floating-promises': ['error'],
  'no-for-in-array': ['error'],
  'no-implied-eval': ['error'],
  'no-import-type-side-effects': ['error'],
  'no-inferrable-types': ['error'],

  /**
   * Typescript checks this now.
   */
  'no-invalid-this': ['off'],
  'no-invalid-void-type': ['error'],
  'no-loop-func': ['error'],

  /**
   * Deprecated, eslint upstream fully supported now.
   */
  'no-loss-of-precision': ['off'],
  'no-magic-numbers': [
    'error',
    {
      ignore: [
        -1,
        0,
        1,
      ],
    },
  ],
  'no-meaningless-void-operator': ['error'],
  'no-misused-new': ['error'],
  'no-misused-promises': ['error'],
  'no-mixed-enums': ['error'],
  'no-namespace': ['error'],
  'no-non-null-asserted-nullish-coalescing': ['error'],
  'no-non-null-asserted-optional-chain': ['error'],
  'no-non-null-assertion': ['error'],

  /**
   * Checked by Typescript now.
   */
  'no-redeclare': ['off'],
  'no-redundant-type-constituents': ['error'],
  'no-require-imports': ['error'],
  'no-restricted-imports': ['off'],
  'no-restricted-types': ['off'],
  'no-shadow': ['error'],
  'no-this-alias': ['error'],

  /**
   * Deprecated
   */
  'no-type-alias': ['off'],
  'no-unnecessary-boolean-literal-compare': ['error'],
  'no-unnecessary-condition': ['error'],
  'no-unnecessary-qualifier': ['error'],
  'no-unnecessary-template-expression': ['error'],
  'no-unnecessary-type-arguments': ['error'],
  'no-unnecessary-type-assertion': ['error'],
  'no-unnecessary-type-constraint': ['error'],
  'no-unsafe-argument': ['error'],
  'no-unsafe-assignment': ['error'],
  'no-unsafe-call': ['error'],
  'no-unsafe-declaration-merging': ['error'],
  'no-unsafe-enum-comparison': ['error'],

  // 'no-unsafe-function-type': ['error'],
  'no-unsafe-member-access': ['error'],
  'no-unsafe-return': ['error'],
  'no-unsafe-unary-minus': ['error'],
  'no-unused-expressions': ['error'],
  'no-unused-vars': ['error'],
  'no-use-before-define': ['error'],
  'no-useless-constructor': ['error'],
  'no-useless-empty-export': ['error'],

  /**
   * Deprecated
   */
  'no-var-requires': ['off'],

  // 'no-wrapper-object-types': ['error'],
  'non-nullable-type-assertion-style': ['error'],
  'only-throw-error': ['error'],
  'parameter-properties': [
    'error',
    {
      prefer: 'class-property',
    },
  ],
  'prefer-as-const': ['error'],
  'prefer-destructuring': ['error'],
  'prefer-enum-initializers': ['error'],
  'prefer-find': ['error'],
  'prefer-for-of': ['error'],
  'prefer-function-type': ['error'],
  'prefer-includes': ['error'],
  'prefer-literal-enum-member': ['error'],
  'prefer-namespace-keyword': ['error'],

  /**
   * Leaving this as default for now.
   */
  'prefer-nullish-coalescing': ['error'],

  /**
   * Leaving this as default for now.
   */
  'prefer-optional-chain': ['error'],
  'prefer-promise-reject-errors': ['error'],
  'prefer-readonly': ['error'],
  'prefer-readonly-parameter-types': ['off'],
  'prefer-reduce-type-parameter': ['error'],
  'prefer-regexp-exec': ['error'],
  'prefer-return-this-type': ['error'],
  'prefer-string-starts-ends-with': ['error'],

  /**
   * Deprecated
   */
  'prefer-ts-expect-error': ['off'],
  'promise-function-async': ['error'],
  'require-array-sort-compare': ['error'],
  'require-await': ['error'],

  /**
   * Leaving this as default for now.
   */
  'restrict-plus-operands': ['error'],

  /**
   * Leaving this as default for now.
   */
  'restrict-template-expressions': ['error'],
  'return-await': ['error'],

  /**
   * Deprecated in favor of "perfectionist" rules provided
   * by another package.
   */
  'sort-type-constituents': ['off'],
  'strict-boolean-expressions': ['error'],
  'switch-exhaustiveness-check': ['error'],
  'triple-slash-reference': ['error'],

  /**
   * Swing back to this later. Seems like a complex
   * configuration.
   */
  'typedef': ['off'],
  'unbound-method': ['error'],
  'unified-signatures': [
    'error',
    {
      ignoreDifferentlyNamedParameters: false,
    },
  ],
  'use-unknown-in-catch-callback-variable': ['error'],
};

export {
  typescriptRules,
  disableRootRules,
};
