function validate(text, textCase) {
  const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errorsText = {
    /* eslint-disable max-len */
    emptyTextValue: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    emptyCaseValue: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    invalidCaseValue: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    /* eslint-enable max-len */
  };
  const errors = [];

  if (!text.length) {
    errors.push({ message: errorsText.emptyTextValue });
  }

  if (!textCase) {
    errors.push({ message: errorsText.emptyCaseValue });
  }

  if (textCase && !validCases.includes(textCase)) {
    errors.push({ message: errorsText.invalidCaseValue });
  }

  return errors;
}

module.exports = { validate };
