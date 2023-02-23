const errorMessages = {
  textMissing: 'Text to convert is required. Correct request is: '
  + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseMissing: '"toCase" query param is required. Correct request is: '
  + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  anotherCase: 'This case is not supported. Available cases: '
  + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = {
  errorMessages,
};
