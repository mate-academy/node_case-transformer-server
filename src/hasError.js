const caseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function hasError(originalText, targetCase) {
  const errors = [];

  if (!originalText.length) {
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

  if (!caseName.includes(targetCase) && targetCase) {
    errors.push({
      message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (errors.length !== 0) {
    return {
      errors,
    };
  }
}

module.exports = {
  hasError,
};
