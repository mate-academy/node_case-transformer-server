/* eslint-disable max-len */
const cases = ['SNAKE', 'KEBAB', 'UPPER', 'PASCAL', 'CAMEL'];
const errorMessages = [
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
];

const validateCase = (originalText, targetCase) => {
  const errors = [];

  if (!originalText) {
    errors.push({ message: errorMessages[0] });
  }

  if (!targetCase) {
    errors.push({ message: errorMessages[1] });
  }

  if (!cases.includes(targetCase)) {
    errors.push({ message: errorMessages[2] });
  }

  return errors;
};

module.exports = {
  validateCase,
};
