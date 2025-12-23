/* eslint-disable max-len */
const cases = ['SNAKE', 'KEBAB', 'UPPER', 'CAMEL', 'PASCAL'];
const ERORR_MESSAGE_TEXT_REQUIRED = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERORR_MESSAGE_CASE_REQUIRED = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERORR_MESSAGE_CASE_NOT_EXIST = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

module.exports = {
  cases,
  ERORR_MESSAGE_TEXT_REQUIRED,
  ERORR_MESSAGE_CASE_REQUIRED,
  ERORR_MESSAGE_CASE_NOT_EXIST,
};
