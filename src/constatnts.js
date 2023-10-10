/* eslint-disable max-len */
const STATIC_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const NO_TEXT_ERROR_MESSAGE = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const NO_CASE_ERROR_MESSAGE = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const INVALID_CASE_ERROR_MESSAGE = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

module.exports = {
  STATIC_CASES,
  NO_TEXT_ERROR_MESSAGE,
  NO_CASE_ERROR_MESSAGE,
  INVALID_CASE_ERROR_MESSAGE,
};
