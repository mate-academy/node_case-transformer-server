function validation(originalText, toCase) {
  const allowedCases = new Set(['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']);
  const errors = [];

  // check if original text is missing or empty
  if (!originalText) {
    errors.push({
      message:
        'Text to convert is required. ' +
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  // check of toCase is missing
  if (!toCase) {
    errors.push({
      message:
        '"toCase" query param is required. ' +
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  // check if toCase is valid
  if (toCase && !allowedCases.has(toCase)) {
    errors.push({
      message:
        'This case is not supported. ' +
        'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

module.exports = { validation };
