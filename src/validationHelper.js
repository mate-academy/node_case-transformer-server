const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']

const getValidationErrors = (text, toCase) => {
  const errors = [];

  if (!text) {
    errors.push('Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  }

  if (!toCase) {
    errors.push('"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  }

  if (toCase && !validCases.includes(toCase.toUpperCase())) {
    errors.push('This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
  }

  return errors;
}

module.exports = {
  getValidationErrors,
};

