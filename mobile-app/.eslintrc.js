module.exports = {
  root: true,
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  ignorePatterns: ['babel.config.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: '17.0.2',
    },
  },
  rules: {
    '@typescript-eslint/semi': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-nested-ternary': 'off',
    'max-params': 'off',
    'react/prop-types': 0,
    'react/display-name': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/indent': ['error', 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      FunctionDeclaration: {parameters: 1, body: 1},
      FunctionExpression: {parameters: 1, body: 1},
      CallExpression: {arguments: 1},
      MemberExpression: 1,
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
    }],
    'no-multi-spaces': 'error',
    quotes: ['error', 'single', {avoidEscape: true, allowTemplateLiterals: true}],
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    'block-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'array-bracket-newline': ['off', 'consistent'],
    '@typescript-eslint/no-unused-vars': [2, {args: 'all', argsIgnorePattern: '^_'}],
    'comma-spacing': ['error', {before: false, after: true}],
    'comma-dangle': ['warn', 'always-multiline'],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
        overrides: {
          return: {
            after: true,
          },
          throw: {
            after: true,
          },
          case: {
            after: true,
          },
        },
      },
    ],
    'no-multi-assign': ['error'],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 0,
      },
    ],
  },
};
