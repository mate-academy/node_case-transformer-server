/* eslint-disable max-len */
const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const error = {
  textError: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseMissingError: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseInvalidError: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const handleError = (text, convertCase) => {
  const errors = [];

  if (!text) {
    errors.push({ message: error.textError });
  }

  if (!convertCase) {
    errors.push({ message: error.toCaseMissingError });
  }

  if (convertCase && !cases.includes(convertCase)) {
    errors.push({ message: error.toCaseInvalidError });
  }

  return errors;
};

module.exports = { handleError };
