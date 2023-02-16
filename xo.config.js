module.exports = {
  space: true,
  rules: {
    semi: 0,
    camelcase: 0,
    'no-useless-catch': 0,
    'arrow-body-style': 0,
    'unicorn/prefer-module': 0,
    'unicorn/string-content': 0,
    'unicorn/no-process-exit': 0,
    'n/prefer-global/process': 0,
    'unicorn/prefer-node-protocol': 0,
    'promise/prefer-await-to-then': 0,
    'unicorn/no-abusive-eslint-disable': 0,
    quotes: ['error', 'single', {allowTemplateLiterals: true}],
  },
  ignores: ['src/stubs/**'],
}
