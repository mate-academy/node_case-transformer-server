function validateURL(textToConvert, toCase) {
  const caseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const requestErrors = {
    errors: [],
  };

  if (!textToConvert) {
    requestErrors.errors.push({
      message: 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    requestErrors.errors.push({
      message: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });

    return requestErrors;
  }

  if (!caseNames.includes(toCase)) {
    requestErrors.errors.push({
      message: 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return requestErrors.errors.length
    ? requestErrors
    : 'valid';
};

module.exports = { validateURL };
