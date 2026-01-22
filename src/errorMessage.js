const errorMessage = {
  // eslint-disable-next-line max-len
  textIsRequired: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  // eslint-disable-next-line max-len
  caseIsIsRequired: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  // eslint-disable-next-line max-len
  caseIsNotSupported: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = {
  errorMessage,
};
