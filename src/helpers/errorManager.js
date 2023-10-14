const AVAILABLE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function errorManager(originalText, targetCase) {
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

  if (targetCase && !AVAILABLE_CASES.includes(targetCase)) {
    errors.push({
      message: 'This case is not supported. '
        + `Available cases: ${AVAILABLE_CASES.join(', ')}.`,
    });
  }

  return errors;
}

module.exports = { errorManager };
