function validateInput(text, caseName) {
  const errors = [];

  if (!text) {
    errors.push({
      message:
        'Text to convert is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!caseName) {
    errors.push({
      message:
        '"toCase" query param is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (
    caseName &&
    !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(
      caseName.toUpperCase(),
    )
  ) {
    errors.push({
      message:
        'This case is not supported. Available cases: ' +
        'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

module.exports = { validateInput };
