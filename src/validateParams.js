/* eslint-disable max-len */
const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorMessages = {
  emptyText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  emptyCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidCase: `This case is not supported. Available cases: ${validCases.join(', ')}.`,
};

const validateParams = (text, toCase) => {
  const errors = [];

  if (!text) {
    errors.push({ message: errorMessages.emptyText });
  }

  if (!toCase) {
    errors.push({ message: errorMessages.emptyCase });
  }

  if (!validCases.includes(toCase) && toCase) {
    errors.push({ message: errorMessages.invalidCase });
  }

  return errors;
};

module.exports = {
  validateParams,
};
