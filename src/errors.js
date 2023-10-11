/* eslint-disable max-len */
const ERROR_MESSAGE_NO_TEXT = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_MESSAGE_NO_CASE = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_MESSAGE_INVALID_CASE = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function getError(originalText, targetCase) {
  const errors = {
    errors: [],
  };

  if (!originalText) {
    errors.errors.push({
      message: ERROR_MESSAGE_NO_TEXT,
    });
  }

  if (!targetCase) {
    errors.errors.push({
      message: ERROR_MESSAGE_NO_CASE,
    });
  }

  if (targetCase && !cases.includes(targetCase)) {
    errors.errors.push({
      message: ERROR_MESSAGE_INVALID_CASE,
    });
  }

  return errors;
}

module.exports = { getError };
