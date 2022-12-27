const errorMessages = {
  noTextError: {
    message: 'Text to convert is required. Correct request is: '
    + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },

  noCaseError: {
    message: '"toCase" query param is required. Correct request is: '
    + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },

  caseValueError: {
    message: 'This case is not supported. Available cases: '
    + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  },
};

exports.errorMessages = errorMessages;
