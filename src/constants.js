/* eslint-disable max-len */
const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
};

const ERROR_MESSAGES = {
  TEXT_REQUIRED:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  CASE_REQUIRED:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  CASE_NOT_SUPPORTED:
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = {
  SUPPORTED_CASES,
  STATUS_CODES,
  ERROR_MESSAGES,
};
