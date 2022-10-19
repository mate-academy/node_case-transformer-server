const errorTypes = {
  textIsMissing: 'text is missing',
  toCaseIsMissing: 'to case is missing',
  notSupportedCase: 'not supported case',
};

const getError = (errorType) => {
  switch (errorType) {
    case errorTypes.textIsMissing:
      return (
        {
          message: 'Text to convert is required. '
            + 'Correct request is: '
            + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        }
      );

    case errorTypes.toCaseIsMissing:
      return (
        {
          message: '"toCase" query param is required. '
            + 'Correct request is: '
            + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        }
      );

    case errorTypes.notSupportedCase:
      return (
        {
          message: 'This case is not supported. '
            + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        }
      );

    default:
      return null;
  }
};

module.exports = {
  getError,
  errorTypes,
};
