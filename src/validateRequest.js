function validateRequest(textToConvert, caseName) {
  const errors = [];

  if (!textToConvert) {
    errors.push({
      // eslint-disable-next-line
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!caseName) {
    errors.push({
      // eslint-disable-next-line
      message: '\"toCase\" query param is required. Correct request is: \"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>\".',
    });
  }

  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (caseName && !supportedCases.includes(caseName.toUpperCase())) {
    errors.push({
      // eslint-disable-next-line
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

module.exports = { validateRequest };
