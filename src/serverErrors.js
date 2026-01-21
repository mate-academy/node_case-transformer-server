const serverErrors = {
  noText: 'Text to convert is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noTargetCase: '"toCase" query param is required. '
  + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidTargetCase: 'This case is not supported. '
  + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = { serverErrors };
