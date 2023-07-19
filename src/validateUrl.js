/* eslint-disable max-len */
const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessage = {
  textMissing: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseMissing: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseInvalid: `This case is not supported. Available cases: ${validCases.join(', ')}.`,
};

function validateUrl(textToConvert, toCase) {
  const errors = [];

  if (!textToConvert) {
    errors.push({ message: errorMessage.textMissing });
  }

  if (!toCase) {
    errors.push({ message: errorMessage.toCaseMissing });
  }

  if (toCase && !validCases.includes(toCase)) {
    errors.push({ message: errorMessage.toCaseInvalid });
  }

  return errors;
}

module.exports = {
  validateUrl,
};
