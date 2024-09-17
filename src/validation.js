/* eslint-disable max-len */
const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorMessage = {
  emptyText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  emptyCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notSupportedCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const validation = (originalText, targetCase) => {
  const allErrors = [];

  if (!originalText) {
    allErrors.push({
      message: errorMessage.emptyText,
    });
  }

  if (!targetCase) {
    allErrors.push({
      message: errorMessage.emptyCase,
    });
  }

  if (!supportedCases.includes(targetCase) && targetCase) {
    allErrors.push({
      message: errorMessage.notSupportedCase,
    });
  }

  return { errors: allErrors };
};

module.exports = { validation };
