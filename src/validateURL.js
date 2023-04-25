const validateURL = (originalText, targetCase) => {
  const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const errorsList = [];

  if (!originalText) {
    errorsList.push({
      message: 'Text to convert is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!targetCase) {
    errorsList.push({
      message: '"toCase" query param is required. Correct request is: '
      + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (targetCase && !validCases.includes(targetCase)) {
    errorsList.push({
      message: 'This case is not supported. Available cases'
      + ': SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errorsList;
};

module.exports = { validateURL };
