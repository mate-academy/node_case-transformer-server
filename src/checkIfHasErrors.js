/* eslint-disable max-len */
const availableCaseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const messages = {
  noCaseParam: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noTextToConvert: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  incorrectToCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function checkIfhasErrors(targetCase, textToConvert) {
  const result = [];

  if (!textToConvert.length) {
    result.push({ message: messages.noTextToConvert });
  }

  if (!targetCase) {
    result.push({ message: messages.noCaseParam });
  }

  if (!availableCaseNames.includes(targetCase) && targetCase) {
    result.push({ message: messages.incorrectToCase });
  }

  return result;
}

module.exports.checkIfhasErrors = checkIfhasErrors;
