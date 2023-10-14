const errorMessages = {
  NO_TEXT: 'Text to convert is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_CASE: '"toCase" query param is required. Correct request is: '
    + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NOT_VALID_CASE: 'This case is not supported. Available cases: '
    + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = { errorMessages };
