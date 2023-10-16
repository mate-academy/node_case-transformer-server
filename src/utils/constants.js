/* eslint-disable max-len */
const PORT = 5700;
const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const CORRECT_REQUEST = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_MESSAGE_NO_TEXT = `Text to convert is required. ${CORRECT_REQUEST}`;
const ERROR_MESSAGE_NO_CASE = `"toCase" query param is required. ${CORRECT_REQUEST}`;
const ERROR_MESSAGE_INVALID_CASE = `This case is not supported. Available cases: ${availableCases.join(', ')}.`;

module.exports = {
  PORT,
  ERROR_MESSAGE_NO_TEXT,
  ERROR_MESSAGE_NO_CASE,
  ERROR_MESSAGE_INVALID_CASE,
  availableCases,
};
