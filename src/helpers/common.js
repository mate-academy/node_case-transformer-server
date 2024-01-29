const getErrorResponseBody = (isNoWord, isNoCase, isInvalidCase) => {
  const responseData = {
    errors: [],
  };

  if (isNoWord) {
    responseData.errors.push({
      message: 'Text to convert is required. Correct request is:'
        + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (isNoCase) {
    responseData.errors.push({
      message: '"toCase" query param is required. Correct request is:'
        + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (isInvalidCase) {
    responseData.errors.push({
      message: 'This case is not supported. Available cases:'
        + ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return responseData;
};

module.exports = {
  getErrorResponseBody,
};
