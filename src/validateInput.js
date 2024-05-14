function validateInput(text, caseName) {
  const errorMessages = {
    textRequired:
      'Text to convert is required. Correct request is: ' +
      '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    caseNameRequired:
      '"toCase" query param is required. Correct request is: ' +
      '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    unsupportedCase:
      'This case is not supported. Available cases: ' +
      'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.'
  };

  const errors = [];

  if (!text) {
    errors.push({ message: errorMessages.textRequired });
  }

  if (!caseName) {
    errors.push({ message: errorMessages.caseNameRequired });
  }

  if (
    caseName &&
    !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(
      caseName.toUpperCase(),
    )
  ) {
    errors.push({ message: errorMessages.unsupportedCase });
  }

  return errors;
}

module.exports = { validateInput };
