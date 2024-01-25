/* eslint-disable max-len */
const VALIDATION_ERRORS = {
  NO_TEXT: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_TARGET_CASE: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  CASE_NOT_SUPPORTED: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = VALIDATION_ERRORS;
