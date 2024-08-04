/* eslint-disable max-len */

const CASES_TO_CONVERT = ['UPPER', 'SNAKE', 'KEBAB', 'PASCAL', 'CAMEL'];

const ERRORS = {
  TEXT_TO_CONVERT_IS_REQUIRED:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  CONVERT_TO_IS_REQUIRED:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  CONVERT_TO_IS_INVALID:
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = {
  CASES_TO_CONVERT,
  ERRORS,
};
