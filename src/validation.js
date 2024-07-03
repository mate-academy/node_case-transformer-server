/* eslint-disable max-len */
const AVAILABLE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const ERROR_MESSAGES = {
  TEXT_REQUIRED:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  CASE_REQUIRED:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  CASE_NOT_SUPPORTED:
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function validation(textToConvert, toCase) {
  const ERROR = [];

  if (!textToConvert) {
    ERROR.push({ message: ERROR_MESSAGES.TEXT_REQUIRED });
  }

  if (!toCase) {
    ERROR.push({ message: ERROR_MESSAGES.CASE_REQUIRED });
  }

  if (toCase && !AVAILABLE_CASES.includes(toCase)) {
    ERROR.push({ message: ERROR_MESSAGES.CASE_NOT_SUPPORTED });
  }

  return ERROR;
}

module.exports = { validation };
