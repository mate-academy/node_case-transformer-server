function checkForErrors(text, params) {
  const typeOfCaseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  if (!text) {
    errors.push({
      message: 'Text to convert is required. Correct request is:'
        + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!params) {
    errors.push({
      message: '"toCase" query param is required. Correct request is:'
        + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (params && !typeOfCaseName.includes(params)) {
    errors.push({
      message: 'This case is not supported.'
        + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

module.exports = { checkForErrors };
