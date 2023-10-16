const CORRECT_REQUEST
  = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const ERROR_MESSAGES = {
  text_absent: `Text to convert is required. ${CORRECT_REQUEST}`,
  case_absent: `"toCase" query param is required. ${CORRECT_REQUEST}`,
  unsupported_case: 'This case is not supported.'
    + ` Available cases: ${SUPPORTED_CASES.join(', ')}.`,
};

module.exports = {
  ERROR_MESSAGES,
  SUPPORTED_CASES,
};
