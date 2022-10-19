const serverError = {
  EmptyText: 'Text to convert is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NoToCase: '"toCase" query param is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  InvalidToCase: 'This case is not supported. '
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = {
  serverError,
};
