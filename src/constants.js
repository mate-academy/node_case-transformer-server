const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const CASE_NOT_SUPPORTED = `This case is not supported. Available cases: ${SUPPORTED_CASES.join(', ')}.`;
const CORRECT_REQUEST_MESSAGE
  = ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const TEXT_TO_CONVERT_MESSAGE = 'Text to convert is required.'
+ `${CORRECT_REQUEST_MESSAGE}`;
const QUERY_PARAM_IS_REQUIRED_MESSAGE = '"toCase" query param is required.'
+ `${CORRECT_REQUEST_MESSAGE}`;

module.exports = {
  HTTP_OK,
  HTTP_BAD_REQUEST,
  SUPPORTED_CASES,
  CASE_NOT_SUPPORTED,
  CORRECT_REQUEST_MESSAGE,
  TEXT_TO_CONVERT_MESSAGE,
  QUERY_PARAM_IS_REQUIRED_MESSAGE,
};
