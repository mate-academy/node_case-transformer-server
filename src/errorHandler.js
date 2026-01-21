const TEXT_TO_CONVERT_IS_REQUIRED_ERROR_MESSAGE =
  'Text to convert is required. Correct request is:' +
  ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TO_CASE_IS_REQUIRED_ERROR_MESSAGE =
  '"toCase" query param is required. Correct request is:' +
  ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const CASE_IS_NOT_SUPPORTED_ERROR_MESSAGE =
  'This case is not supported. Available cases:' +
  ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';
const AVAILABLE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function handleError(text, errorResponse, caseName) {
  if (!hasTextToConvert(text)) {
    addError(errorResponse, TEXT_TO_CONVERT_IS_REQUIRED_ERROR_MESSAGE);
  }

  if (!caseName) {
    addError(errorResponse, TO_CASE_IS_REQUIRED_ERROR_MESSAGE);
  }

  if (caseName && !AVAILABLE_CASES.includes(caseName)) {
    addError(errorResponse, CASE_IS_NOT_SUPPORTED_ERROR_MESSAGE);
  }
}

function addError(errorResponse, errorMessage) {
  errorResponse.errors.push({ message: `${errorMessage}` });
}

function hasTextToConvert(pathname) {
  return pathname.length !== 0;
}

module.exports = { handleError };
