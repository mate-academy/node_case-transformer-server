const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function errorHandler(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push({
      message: 'Text to convert is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!availableCases.includes(targetCase) && targetCase) {
    errors.push({
      message: 'This case is not supported. Available cases: '
        + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (!targetCase) {
    errors.push({
      message: '"toCase" query param is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  return errors;
}

module.exports = { errorHandler };
