/* eslint-disable max-len */
const errorMessages = {
  missingText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missingToCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missingCaseName: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = { errorMessages };
