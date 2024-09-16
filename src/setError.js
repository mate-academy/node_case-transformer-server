const setError = (originalText, targetCase, isSupportedCase) => {
  const responseBody = {
    errors: [],
  };

  if (!originalText) {
    const errorMessage = 'Text to convert is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    responseBody.errors.push({ message: errorMessage });
  }

  if (!targetCase) {
    const errorMessage = '"toCase" query param is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    responseBody.errors.push({ message: errorMessage });

    return responseBody;
  }

  if (!isSupportedCase) {
    const errorMessage = 'This case is not supported. '
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

    responseBody.errors.push({ message: errorMessage });
  }

  return responseBody;
};

module.exports = { setError };
