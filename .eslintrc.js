module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb/hooks', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', 'react-native', 'prettier'],

  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  rules: {
    'prefer-destructuring': 'off',
    'max-params': ['error', 4],
    'func-style': ['error', 'expression'],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
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
    // 'module-resolver/use-alias': 2,
    'import/no-namespace': 'error',
    // 'import/no-relative-parent-imports': 'error',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@app/components/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@app/types/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@app/constants/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@app/hooks/**',
            group: 'external',
            position: 'after',
          },

          {
            pattern: '@app/helpers/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@app/utils/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@app/assets/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'styles/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: true,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true, // The true value here is for backward compatibility
        allowLiteral: true,
        allowObject: true,
      },
    ],

    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/forbid-dom-props': ['error', { forbid: ['style'] }],
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/jsx-pascal-case': ['error', { allowAllCaps: false }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],

    // Common abbreviations are known and readable
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/consistent-function-scoping': 'off',
  },
};
