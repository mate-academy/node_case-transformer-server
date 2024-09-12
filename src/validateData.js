/* eslint-disable max-len */
const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorMessages = {
  emptyTextMessage: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  emptyCaseMessage: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidCaseMassage: `This case is not supported. Available cases: ${validCases.join(', ')}.`,
};

function validateData(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({ message: errorMessages.emptyTextMessage });
  }

  if (!toCase) {
    errors.push({ message: errorMessages.emptyCaseMessage });
  }

  if (toCase && !validCases.includes(toCase)) {
    errors.push({ message: errorMessages.invalidCaseMassage });
  }

  return errors;
}

module.exports = { validateData };
