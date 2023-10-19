/* eslint-disable max-len */
const ERROR_MESSAGE_NO_TEXT = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_MESSAGE_NO_CASE = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_MESSAGE_INVALID_CASE = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const AVAILABLE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function serverError(reqText, reqCase) {
  const errorsParams = {
    errors: [],
  };

  if (!reqText) {
    errorsParams.errors.push({ message: ERROR_MESSAGE_NO_TEXT });
  };

  if (!reqCase) {
    errorsParams.errors.push({ message: ERROR_MESSAGE_NO_CASE });
  };

  if (reqCase && !AVAILABLE_CASES.includes(reqCase)) {
    errorsParams.errors.push({ message: ERROR_MESSAGE_INVALID_CASE });
  };

  return errorsParams;
}

module.exports = {
  serverError,
};
