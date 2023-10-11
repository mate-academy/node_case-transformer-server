/* eslint-disable max-len */
const PORT = 5700;

const caseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const ERROR_MESSAGES = {
  NO_ORIGIN_STRING: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_QUERY_CASE: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_SUPPORTED_CASE: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = {
  PORT,
  caseNames,
  ERROR_MESSAGES,
};
