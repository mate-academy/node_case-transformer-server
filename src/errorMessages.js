const errorMessages = {
  missingText:
    // eslint-disable-next-line
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missingCase:
    // eslint-disable-next-line
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  unsupportedCase:
    // eslint-disable-next-line
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = errorMessages;
