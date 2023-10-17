/* eslint-disable max-len */
module.exports = {
  CASES: ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'],
  ERROR: {
    invalidCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    noText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    noCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
};
