/* eslint-disable max-len */
const TEXT_IS_REQUIRED =
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TOCASE_IS_REQUIRED =
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const CASE_IS_NOT_SUPPORTED =
  'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

module.exports = {
  TEXT_IS_REQUIRED,
  TOCASE_IS_REQUIRED,
  CASE_IS_NOT_SUPPORTED,
};
