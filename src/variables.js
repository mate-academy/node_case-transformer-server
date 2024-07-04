/* eslint-disable max-len */

module.exports.TO_CASE_QUERY = 'toCase';

module.exports.ERROR_MESSAGE = {
  TEXT_REQUIRED:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  TO_CASE_REQUIRED:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  INVALID_TO_CASE:
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};
