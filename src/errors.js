/* eslint-disable max-len */
module.exports = {
  MISSING_TEXT: {
    message:
      'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  MISSING_QUERY: {
    message:
      '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  UNSUPPORTED_CASE: {
    message:
      'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  },
};
