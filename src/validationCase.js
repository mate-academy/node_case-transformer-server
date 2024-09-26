const options = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validationCase = (textToConvert, toCase) => {
  const errors = [];

  if (!textToConvert) {
    errors.push(
      'Text to convert is required. '
        + 'Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    );
  }

  if (!toCase) {
    errors.push(
      '"toCase" query param is required. '
        + 'Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    );
  } else if (!options.includes(toCase)) {
    errors.push(
      'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    );
  }

  return errors;
};

module.exports = {
  validationCase,
};
