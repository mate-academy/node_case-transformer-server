const AVAILABLE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const CORRECT_REQUEST = 'Correct request is: '
+ '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const NO_TEXT_ERR_MESSAGE = 'Text to convert is required. ' + CORRECT_REQUEST;
const NO_CASE_ERR_MESSAGE = '"toCase" query param is required. '
+ CORRECT_REQUEST;
const NO_AVAILABLE_CASE_ERR_MESSAGE = 'This case is not supported. '
+ `Available cases: ${AVAILABLE_CASES.join(', ')}.`;

module.exports = {
  AVAILABLE_CASES,
  NO_TEXT_ERR_MESSAGE,
  NO_CASE_ERR_MESSAGE,
  NO_AVAILABLE_CASE_ERR_MESSAGE,
};
