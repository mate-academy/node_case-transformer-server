function validate(text, textCase) {
  const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  if (!text.length) {
    // eslint-disable-next-line max-len
    errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!textCase) {
    // eslint-disable-next-line max-len
    errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (textCase && !validCases.includes(textCase)) {
    // eslint-disable-next-line max-len
    errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  return errors;
}

module.exports = { validate };
