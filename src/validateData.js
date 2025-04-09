function validateData(textToChange, toCase) {
  const errors = [];

  if (!textToChange) {
    errors.push(
      'Text to convert is required.' +
      'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    );
  }

  if (!toCase) {
    errors.push(
      '"toCase" query param is required.' +
      'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    );
  }

  if (!['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)) {
    errors.push(
      'This case is not supported.' +
      'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    );
  }

  return errors;
}

module.exports = { validateData };
