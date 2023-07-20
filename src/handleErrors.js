/* eslint-disable max-len */
const caseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorMessages = {
  missedText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missedCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notListedCase: `This case is not supported. Available cases: ${caseNames.join(', ')}.`,
};

function handleErrors(textToConvert, caseName) {
  const errors = [];

  if (!textToConvert) {
    errors.push({ message: errorMessages.missedText });
  }

  if (!caseName) {
    errors.push({ message: errorMessages.missedCase });
  }

  if (caseName && !caseNames.includes(caseName)) {
    errors.push({ message: errorMessages.notListedCase });
  }

  return errors;
}

module.exports = { handleErrors };
