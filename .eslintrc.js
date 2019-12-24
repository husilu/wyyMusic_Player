module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "quotes": [0, ["double"]],
    'semi': 0,
    "space-before-function-paren": 0
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
