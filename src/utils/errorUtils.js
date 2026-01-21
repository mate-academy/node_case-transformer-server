/* eslint-disable max-len */
const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const ERROR_TEXT_REQUIRED = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_QUERY_PARAM_REQUIRED = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_UNSUPPORTED_CASE = `This case is not supported. Available cases: ${SUPPORTED_CASES.join(', ')}.`;

function catchErrors(pathname, queryParams) {
  const errors = [];

  if (!pathname) {
    errors.push({ message: ERROR_TEXT_REQUIRED });
  }

  if (!queryParams) {
    errors.push({ message: ERROR_QUERY_PARAM_REQUIRED });
  } else if (!SUPPORTED_CASES.includes(queryParams.toUpperCase())) {
    errors.push({ message: ERROR_UNSUPPORTED_CASE });
  }

  return errors;
}

module.exports = { catchErrors };
