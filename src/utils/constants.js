const PORT = 5700;

const CODE_ERROR_OCCURRED = 400;
const CODE_SUCCESS = 200;

const AVAILABLE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const CORRECT_REQUEST_MESSAGE = 'Correct request is: '
  + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_NO_TEXT_PROVIDED = 'Text to convert is required. '
  + CORRECT_REQUEST_MESSAGE;
const ERROR_NO_CASE_PROVIDED = '"toCase" query param is required. '
  + CORRECT_REQUEST_MESSAGE;
const ERROR_INVALID_CASE = `This case is not supported. Available cases: ${AVAILABLE_CASES.join(', ')}.`;

module.exports = {
  PORT,
  ERROR_NO_TEXT_PROVIDED,
  ERROR_NO_CASE_PROVIDED,
  AVAILABLE_CASES,
  ERROR_INVALID_CASE,
  CODE_ERROR_OCCURRED,
  CODE_SUCCESS,
};
