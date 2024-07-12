const TEXT_TO_CONVERT_ERROR =
  'Text to convert is required.' +
  ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const TO_CASE_ERROR =
  '"toCase" query param is required.' +
  ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const NOT_SUPPORTED_CASE =
  'This case is not supported.' +
  ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

module.exports = {
  TEXT_TO_CONVERT_ERROR,
  TO_CASE_ERROR,
  NOT_SUPPORTED_CASE,
  SUPPORTED_CASES,
};
