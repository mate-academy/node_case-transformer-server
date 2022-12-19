const errorMessages = {
  noOriginalText: 'Text to convert is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noOriginalCase: '"toCase" query param is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidCase: 'This case is not supported. '
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = { errorMessages };
