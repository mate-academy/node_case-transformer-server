/* eslint-disable max-len */

const errorMessages = {
  textRequired: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  queryRequired: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notSuportedCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function handleErrors(textToConvert, toCase) {
  const errors = [];
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!textToConvert) {
    errors.push({ message: errorMessages.textRequired });
  }

  if (!toCase) {
    errors.push({ message: errorMessages.queryRequired });
  }

  if (!!toCase && !supportedCases.includes(toCase)) {
    errors.push({ message: errorMessages.notSuportedCase });
  }

  return errors;
}

module.exports = { handleErrors };
