/* eslint-disable max-len */
const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessage = {
  missingText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missingCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  unavailableCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const isValidUrlParams = (text, toCase) => {
  const errors = [];

  if (!text) {
    errors.push({ message: errorMessage.missingText });
  }

  if (!toCase) {
    errors.push({ message: errorMessage.missingCase });
  }

  if (toCase && !validCases.includes(toCase)) {
    errors.push({ message: errorMessage.unavailableCase });
  }

  return errors;
};

module.exports = { isValidUrlParams };
