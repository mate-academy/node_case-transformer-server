/* eslint-disable max-len */
const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessages = {
  missingText:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missingCase:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notSupported:
    `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
};

function validateURL(toCase, text) {
  const errors = [];

  if (!text) {
    errors.push({ message: errorMessages.missingText });
  }

  if (!toCase) {
    errors.push({ message: errorMessages.missingCase });
  }

  if (toCase && !supportedCases.includes(toCase.toUpperCase())) {
    errors.push({ message: errorMessages.notSupported });
  }

  return errors;
};

module.exports = {
  validateURL,
};
