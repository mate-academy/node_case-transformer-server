/* eslint-disable max-len */
const ERROR_MESSAGE_NO_TEXT = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_MESSAGE_NO_CASE = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_MESSAGE_INVALID_CASE = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function getErrors(requestText, requestCase) {
  const errors = {
    errors: [],
  };

  if (!requestText) {
    errors.errors.push({ message: ERROR_MESSAGE_NO_TEXT });
  }

  if (!requestCase) {
    errors.errors.push({ message: ERROR_MESSAGE_NO_CASE });
  }

  if (requestCase && !allowedCases.includes(requestCase)) {
    errors.errors.push({ message: ERROR_MESSAGE_INVALID_CASE });
  }

  return errors;
}

module.exports = {
  getErrors,
};
