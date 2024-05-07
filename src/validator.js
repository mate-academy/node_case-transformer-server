/* eslint-disable max-len */
const validator = (text, caseToTransform) => {
  const errors = [];
  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!text.length) {
    errors.push({
      message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!caseToTransform) {
    errors.push({
      message:
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!availableCases.includes(caseToTransform) && caseToTransform) {
    errors.push({
      message:
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (errors.length) {
    return {
      errors,
    };
  }
};

module.exports = {
  validator,
};
