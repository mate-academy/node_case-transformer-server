/* eslint-disable max-len */
const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'UPPER', 'PASCAL', 'CAMEL'];

const ERROR_MESSAGES = {
  noTextToConvert: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noCaseParam: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notSupportedCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = { ERROR_MESSAGES, SUPPORTED_CASES };
