const errorMessages = {
  caseNotSupported: 'This case is not supported.'
  + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  isNotText: 'Text to convert is required.'
  + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  isNotCase: '"toCase" query param is required.'
  + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
};

module.exports = {
  errorMessages,
};
