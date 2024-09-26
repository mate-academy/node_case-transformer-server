/* eslint-disable max-len */
const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errors = {
  incorectText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  incorectCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notListedCase: `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
};

module.exports = { supportedCases, errors };
