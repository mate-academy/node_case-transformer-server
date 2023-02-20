/* eslint-disable max-len */

function validateURL(originalText, targetCase) {
  const caseOptions = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const errors = [];

  if (!originalText) {
    const errorMessage = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    errors.push({ message: errorMessage });
  }

  if (!targetCase) {
    const errorMessage = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    errors.push({ message: errorMessage });
  }

  if (targetCase && !caseOptions.includes(targetCase)) {
    const errorMessage = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

    errors.push({ message: errorMessage });
  }

  return errors;
}

module.exports = {
  validateURL,
};
