/* eslint-disable max-len */

const STATUS_CODES = {
  OK: {
    status_code: 200,
    status_text: 'OK',
  },
  BAD_REQUEST: {
    status_code: 400,
    status_text: 'Bad Request',
  },
};

const CASES_TO_CONVERT = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const MESSAGES = {
  no_text: {
    message:
      'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  no_case: {
    message:
      '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  case_not_supported: {
    message:
      'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  },
};

module.exports = {
  STATUS_CODES,
  CASES_TO_CONVERT,
  MESSAGES,
};
