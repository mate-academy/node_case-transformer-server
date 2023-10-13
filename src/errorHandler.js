const AVALIABLE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function errorHandler(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push({
      message: 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!targetCase) {
    errors.push({
      message: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (targetCase && !AVALIABLE_CASES.includes(targetCase)) {
    errors.push({
      message: 'This case is not supported. '
      + `Available cases: ${AVALIABLE_CASES.join(', ')}.`,
    });
  }

  return errors;
}

module.exports = {
  errorHandler,
};
