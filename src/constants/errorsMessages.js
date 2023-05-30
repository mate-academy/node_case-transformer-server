/* eslint-disable max-len */
const errorMessages = [
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
];

module.exports = { errorMessages };
