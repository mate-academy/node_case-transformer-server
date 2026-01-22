/* eslint-disable max-len */
const MISSED_TEXT = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const MISSED_CASE_NAME = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const NOT_EXISTING_CASE_NAME = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';
const CASE_NAMES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

module.exports = {
  MISSED_TEXT,
  MISSED_CASE_NAME,
  NOT_EXISTING_CASE_NAME,
  CASE_NAMES,
};
