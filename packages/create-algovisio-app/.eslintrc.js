module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
  },
  parser: 'babel-eslint',
  overrides: [
    {
      files: ["src/**", "templates/default/scripts/**"],
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ["**"],
      rules: {
        'import/no-unresolved': 'off'
      }
    }
  ]
};
