const checkErrors = (textToConvert, toCase) => {
  const errors = [];

  if (!textToConvert) {
    errors.push({ message: 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!toCase) {
    errors.push({ message: '"toCase" query param is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (toCase && !supportedCases.includes(toCase)) {
    errors.push({
      message: `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
    });
  }

  return errors;
};

module.exports = { checkErrors };
