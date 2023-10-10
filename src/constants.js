/* eslint-disable max-len */
const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const ERROR_MISSING_TEXT = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_MISSING_TO_CASE = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_INVALID_TO_CASE = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

module.exports = {
  CASES,
  ERROR_MISSING_TEXT,
  ERROR_MISSING_TO_CASE,
  ERROR_INVALID_TO_CASE,
};
