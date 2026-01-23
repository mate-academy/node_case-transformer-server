const errorMessages = {
  noTextToConvert:
    'Text to convert is required. ' +
    'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noParams:
    '"toCase" query param is required. ' +
    'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidCase:
    'This case is not supported. ' +
    'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = { errorMessages };
