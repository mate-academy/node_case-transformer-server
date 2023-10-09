/* eslint-disable max-len */
const NO_TEXT_MESSAGE = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const NO_CASE_MESSAGE = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const INVALID_CASE_MESSAGE = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';
const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

module.exports = {
  NO_TEXT_MESSAGE,
  NO_CASE_MESSAGE,
  INVALID_CASE_MESSAGE,
  CASES,
};
