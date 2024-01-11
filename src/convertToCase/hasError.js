/* eslint-disable max-len */
const caseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessage = {
  missingText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missingCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const validation = (text, targetCase) => {
  const errors = [];

  if (!text) {
    errors.push({
      message: errorMessage.missingText,
    });
  }

  if (!targetCase) {
    errors.push({
      message: errorMessage.missingCase,
    });
  }

  if (targetCase && !caseName.includes(targetCase)) {
    errors.push({
      message: errorMessage.invalidCase,
    });
  }

  if (errors.length > 0) {
    throw errors;
  }
};

module.exports = {
  validation,
};
