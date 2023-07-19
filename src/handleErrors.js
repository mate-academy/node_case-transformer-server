/* eslint-disable max-len */
const caseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorMessages = {
  missedText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missedCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notListedCase: `This case is not supported. Available cases: ${caseNames.join(', ')}.`,
};

function handleErrors(textToConvert, caseName) {
  const errors = [];

  if (!textToConvert && !caseName) {
    errors.push(
      { message: errorMessages.missedText },
      { message: errorMessages.missedCase },
    );
  } else if (!textToConvert && !caseNames.includes(caseName)) {
    errors.push(
      { message: errorMessages.missedText },
      { message: errorMessages.notListedCase },
    );
  } else if (!textToConvert) {
    errors.push({ message: errorMessages.missedText });
  } else if (!caseName) {
    errors.push({ message: errorMessages.missedCase });
  } else if (!caseNames.includes(caseName)) {
    errors.push({ message: errorMessages.notListedCase });
  }

  return errors;
}

module.exports = { handleErrors };
