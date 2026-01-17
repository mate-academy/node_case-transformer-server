/* eslint-disable max-len */
const TEXT_REQUIRED =
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const TO_CASE_REQUIRED =
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const CASE_NOT_SUPPORTED =
  'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

module.exports = {
  TEXT_REQUIRED,
  TO_CASE_REQUIRED,
  CASE_NOT_SUPPORTED,
};
