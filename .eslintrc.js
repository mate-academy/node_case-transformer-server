module.exports = {
  extends: '@mate-academy/eslint-config',
  env: {
    jest: true,
  },
  plugins: ['jest'],
  rules: {
    'no-proto': 0,
    'max-len': ['error', { code: 80 }],
  },
};
