'use strict';

const ERROR_MESSAGES = {
  CONVERT_TEXT_MISSED: {
    message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  },
  CASE_MISSED: {
    message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  },
  CASE_WRONG: {
    message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
  },
};

const AVAILABLE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateURL(pathname, convertType) {
  const errors = {
    errors: [],
  };

  if (!pathname.length) {
    errors.errors.push(ERROR_MESSAGES.CONVERT_TEXT_MISSED);
  }

  if (!convertType) {
    errors.errors.push(ERROR_MESSAGES.CASE_MISSED);
  } else if (!AVAILABLE_CASES.includes(convertType)) {
    errors.errors.push(ERROR_MESSAGES.CASE_WRONG);
  }

  return errors;
}

module.exports = { validateURL };
