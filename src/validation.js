/* eslint-disable max-len */

const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validation(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!targetCase) {
    errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (targetCase && !validCases.includes(targetCase)) {
    errors.push({ message: `This case is not supported. Available cases: ${validCases.join(', ')}.` });
  }

  return errors;
}

module.exports = { validation };
