const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessages = {
  noText: 'Text to convert is required. Correct request is: '
    + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noCase: '"toCase" query param is required. Correct request is: '
    + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  caseNotSupported: 'This case is not supported. Available cases: '
    + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = {
  cases,
  errorMessages,
};
