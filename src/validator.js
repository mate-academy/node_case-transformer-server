/* eslint-disable max-len */
const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validator = (text, caseToTransform) => {
  const errors = [];  

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
         `This case is not supported. Available cases: ${availableCases.join(', ')}.`,
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
