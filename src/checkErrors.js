const cases = [
  'SNAKE',
  'KEBAB',
  'CAMEL',
  'PASCAL',
  'UPPER',
];

const checkErrors = (textToConvert, toCase) => {
  const errors = [];

  if (!textToConvert) {
    errors.push({
      message: 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!cases.includes(toCase) && toCase) {
    errors.push({
      message: `This case is not supported. Available cases: ${cases.join(', ')}.`,
    });
  }

  return errors;
};

module.exports = { checkErrors };
