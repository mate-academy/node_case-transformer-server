/* eslint-disable max-len */
const CORRECT_REQUEST = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const AVAILABLE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const ERROR_MESSAGE_NO_TEXT = `Text to convert is required. ${CORRECT_REQUEST}`;
const ERROR_MESSAGE_NO_CASE = `"toCase" query param is required. ${CORRECT_REQUEST}`;
const ERROR_MESSAGE_INVALID_CASE = `This case is not supported. Available cases: ${AVAILABLE_CASES.join(', ')}.`;

module.exports = {
  ERROR_MESSAGE_NO_TEXT,
  ERROR_MESSAGE_NO_CASE,
  ERROR_MESSAGE_INVALID_CASE,
  AVAILABLE_CASES,
};
