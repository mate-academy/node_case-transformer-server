/* eslint-disable max-len */
const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorMessage = {
  hasNoString: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  hasNoCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  hasNoAvailableCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function validateRequest(string, toCase) {
  const errorArray = [];

  if (!string) {
    errorArray.push({ message: errorMessage.hasNoString });
  }

  if (!toCase) {
    errorArray.push({ message: errorMessage.hasNoCase });
  }

  if (toCase && !availableCases.includes(toCase)) {
    errorArray.push({ message: errorMessage.hasNoAvailableCase });
  }

  return errorArray;
};

module.exports = { validateRequest };
