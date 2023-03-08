/* eslint-disable max-len */
const errors = {
  emptyText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  emptyCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notSupportedCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const validateErrors = (url, toCase) => {
  const errorMessage = [];

  if (!url.length) {
    errorMessage.push({
      message: errors.emptyText,
    });
  }

  if (!toCase) {
    errorMessage.push({
      message: errors.emptyCase,
    });
  }

  if (!['SNAKE', 'KEBAB', 'PASCAL', 'CAMEL', 'UPPER'].includes(toCase) && toCase) {
    errorMessage.push({
      message: errors.notSupportedCase,
    });
  }

  return errorMessage;
};

module.exports = {
  validateErrors,
};
