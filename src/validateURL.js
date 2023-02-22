function validateURL(textToConvert, toCase) {
  const cases = [
    'SNAKE',
    'KEBAB',
    'CAMEL',
    'PASCAL',
    'UPPER',
  ];

  const errorMessages = [];

  if (!textToConvert) {
    errorMessages.push({
      message: 'Text to convert is required. Correct request is: '
      + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  };

  if (!toCase) {
    errorMessages.push({
      message: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (!cases.includes(toCase)) {
    errorMessages.push({
      message: 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errorMessages;
}

module.exports = {
  validateURL,
};
