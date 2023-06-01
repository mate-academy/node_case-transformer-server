/* eslint-disable max-len */
function validateData(text, toCase) {
  const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errorMessages = {
    emptyTextMessage: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    emptyCaseMessage: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    invalidCaseMessage: `This case is not supported. Available cases: ${validCases.join(', ')}.`,
  };
  const errors = [];

  if (!text) {
    errors.push({ message: errorMessages.emptyTextMessage });
  }

  if (!toCase) {
    errors.push({ message: errorMessages.emptyCaseMessage });
  }

  if (toCase && !validCases.includes(toCase)) {
    errors.push({ message: errorMessages.invalidCaseMessage });
  }

  return errors;
}

module.exports = { validateData };
