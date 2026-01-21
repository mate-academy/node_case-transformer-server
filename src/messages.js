const CORRECT_TYPE_MESSAGE = ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TEXT_REQUIRED_MESSAGE = 'Text to convert is required.';
const TOCASE_REQUIRED_MESSAGE = '"toCase" query param is required.';
const INVALID_TOCASE_MESSAGE = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

module.exports = {
  CORRECT_TYPE_MESSAGE,
  TEXT_REQUIRED_MESSAGE,
  TOCASE_REQUIRED_MESSAGE,
  INVALID_TOCASE_MESSAGE,
}
