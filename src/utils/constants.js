/* eslint-disable max-len */

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const ERRORS = {
  NO_TEXT_ERROR: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_CASE_ERROR: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  INVALID_CASE_ERROR: `This case is not supported. Available cases: ${SUPPORTED_CASES.join(', ')}.`,
};

module.exports = {
  ERRORS,
  SUPPORTED_CASES,
};
