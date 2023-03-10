const supportedTestCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
/* eslint-disable max-len */
const errorsMessage = {
  missingText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missingCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notSupportedCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const handleErrors = (text, originalCase) => {
  const allErrors = [];

  if (!text) {
    allErrors.push({
      message: errorsMessage.missingText,
    });
  }

  if (!originalCase) {
    allErrors.push({
      message: errorsMessage.missingCase,
    });
  }

  if (originalCase && !supportedTestCases.includes(originalCase)) {
    allErrors.push({
      message: errorsMessage.notSupportedCase,
    });
  }

  return allErrors;
}

module.exports = {
  handleErrors,
};
