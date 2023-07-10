/* eslint-disable max-len */
const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorMessages = {
  noText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidCase: `This case is not supported. Available cases: ${validCases.join(', ')}.`,
};

function validate(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({ message: errorMessages.noText });
  }

  if (!toCase) {
    errors.push({ message: errorMessages.noCase });
  }

  if (toCase && !validCases.includes(toCase)) {
    errors.push({ message: errorMessages.invalidCase });
  }

  return errors;
}

module.exports = {
  validate,
};
