module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:jest-formatting/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jest',
    'jest-formatting',
    'jsx-a11y',
  ],
  rules: {
    'max-len': [
      'error',
      {
        code: 80,
        ignorePattern: '^(import|\\} from )',
        ignoreTemplateLiterals: true,
        ignoreStrings: true,
        ignoreComments: true,
      },
    ],
    'max-params': 'error', // no more than 3 args per function
    // Please use destruction when want to add more
    'import/prefer-default-export': 'off', // just cause non-default exports are awesome
    'import/order': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'jest-formatting/padding-around-expect-groups': 'off',
    'consistent-return': 'off',
    // we allow 0 warnings, so don't think prettier rules are ignored
    // this is only to show prettier issues as warnings, not errors
    'prettier/prettier': 'warn',
    //  too buggy rule: https://github.com/jest-community/eslint-plugin-jest/issues/203
    'jest/valid-describe': 'off',
    'jest/consistent-test-it': 'error',
    'jest/valid-title': [
      'error',
      {
        disallowedWords: ['should'],
      },
    ],

    'react/jsx-one-expression-per-line': 'off',
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
        allowChildren: true,
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
    // rule conflicts with prettier
    'react/jsx-wrap-multilines': [
      'error',
      { declaration: false, assignment: false },
    ],
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/anchor-has-content': [
      2,
      {
        components: ['Link'],
      },
    ],
    // in React 17 there's no need to import React when use JSX
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    // Since we do not use prop-types
    'react/prop-types': 'off',
    'react/require-default-props': 'off',

    // typescript
    '@typescript-eslint/ban-ts-comment': 'off',
  },
}
