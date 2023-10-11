/* eslint-disable max-len */
const ERROR_MESSAGE_NO_TEXT = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_MESSAGE_NO_CASE = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_MESSAGE_INVALID_CASE = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const correctCase = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function serverError(reqText, reqCase) {
  const errors = {
    errors: [],
  };

  if (!reqText) {
    errors.errors.push({ message: ERROR_MESSAGE_NO_TEXT });
  };

  if (!reqCase) {
    errors.errors.push({ message: ERROR_MESSAGE_NO_CASE });
  };

  if (reqCase && !correctCase.includes(reqCase)) {
    errors.errors.push({ message: ERROR_MESSAGE_INVALID_CASE });
  };

  return errors;
}

module.exports = {
  serverError,
};
