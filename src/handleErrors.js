const supportedTestCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
/* eslint-disable max-len */
const errorsMessage = {
  missingText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missingCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notSupportedCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const handleErrors = (text, originalCase) => {
  const errors = [];

  if (!text) {
    errors.push({
      message: errorsMessage.missingText,
    });
  }

  if (!originalCase) {
    errors.push({
      message: errorsMessage.missingCase,
    });
  }

  if (originalCase && !supportedTestCases.includes(originalCase)) {
    errors.push({
      message: errorsMessage.notSupportedCase,
    });
  }

  return errors;
}

module.exports = {
  handleErrors,
};
