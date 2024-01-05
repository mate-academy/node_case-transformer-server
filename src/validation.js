const validation = (originalText, caseToTransform) => {
  const errors = [];
  const caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!originalText.length) {
    errors.push({
      message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!caseToTransform) {
    errors.push({
      message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',

    });
  }

  if (!caseTypes.includes(caseToTransform) && caseToTransform) {
    errors.push({
      message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (errors.length) {
    return {
      errors,
    };
  }
};

module.exports = {
  validation,
};
