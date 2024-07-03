/* eslint-disable max-len */

const VALID_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const STATUS_CODES = {
  OK: 200,
  NOT_FOUND: 404,
};
const ERROR_MESSAGES = {
  MISSING_TEXT:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  MISSING_TO_CASE:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  INVALID_TO_CASE: `This case is not supported. Available cases: ${VALID_CASES.join(', ')}.`,
};

module.exports = {
  VALID_CASES,
  STATUS_CODES,
  ERROR_MESSAGES,
};
