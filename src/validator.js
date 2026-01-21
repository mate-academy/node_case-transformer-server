const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
/* eslint-disable max-len */
const errorsMessage = {
  emptyText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  emptyCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notSupportedCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const validator = (originalText, targetCase) => {
  const allErrors = [];

  if (!originalText) {
    allErrors.push({
      message: errorsMessage.emptyText,
    });
  }

  if (!targetCase) {
    allErrors.push({
      message: errorsMessage.emptyCase,
    });
  }

  if (!supportedCases.includes(targetCase) && targetCase) {
    allErrors.push({
      message: errorsMessage.notSupportedCase,
    });
  }

  return { errors: allErrors };
};

module.exports = { validator };
