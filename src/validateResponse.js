/* eslint-disable max-len */
const validateResponse = (text, caseWord) => {
  const CLASS_NAMES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const error = { errors: [] };

  if (!text) {
    error.errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!caseWord) {
    error.errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (caseWord && !CLASS_NAMES.includes(caseWord)) {
    error.errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  return error;
};

module.exports = { validateResponse };
