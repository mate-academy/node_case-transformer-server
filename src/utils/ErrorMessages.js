/* eslint-disable max-len */
const ErrorMessages = {
  noTextToConvert: {
    message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  noCaseParam: {
    message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  notValidCase: {
    message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  },
};

module.exports = {
  ErrorMessages,
};
