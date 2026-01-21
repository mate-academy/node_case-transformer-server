function getErrors(text, toCase) {
  const cases = [
    'SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER',
  ];

  const ErrorMessages = Object.freeze({
    noText: 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    noCase: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    wrongCase: 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  });

  const errors = [];

  if (text.length === 0) {
    errors.push({ message: ErrorMessages.noText });
  }

  if (!toCase) {
    errors.push({ message: ErrorMessages.noCase });
  }

  if (toCase && !cases.includes(toCase)) {
    errors.push({ message: ErrorMessages.wrongCase });
  }

  return errors;
}

module.exports = {
  getErrors,
}
