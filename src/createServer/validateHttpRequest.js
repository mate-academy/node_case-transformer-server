const CORRECT_REQUEST = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TEXT_ERROR = 'Text to convert is required.';
const TO_CASE_ERROR = '"toCase" query param is required.';
const UNSUPPORTED_CASE_ERROR = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateHttpRequest(targetCase, originalText) {
  const errors = [];

  if (!targetCase) {
    errors.push({ message: `${TO_CASE_ERROR} ${CORRECT_REQUEST}` });
  }

  if (targetCase && !SUPPORTED_CASES.includes(targetCase)) {
    errors.push({ message: UNSUPPORTED_CASE_ERROR });
  }

  if (!originalText) {
    errors.push({ message: `${TEXT_ERROR} ${CORRECT_REQUEST}` })
  }

  return errors;
};

module.exports = { validateHttpRequest };
