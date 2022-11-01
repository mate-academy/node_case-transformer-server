'use strict';

const ALL_CASES = {
  SNAKE: 'SNAKE',
  KEBAB: 'KEBAB',
  CAMEL: 'CAMEL',
  PASCAL: 'PASCAL',
  UPPER: 'UPPER',
};

const ERROR = {
  MISSING_TEXT: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  MISSING_TO_CASE: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  MISSING_CASE_VALUE: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
};

const STATUS_CODE = {
  BAD_REQUEST: 400,
  OK: 200,
};

const STATUS_TEXT = {
  BAD_REQUEST: 'Bad request',
  OK: 'OK',
};

module.exports = {
  ERROR,
  ALL_CASES,
  STATUS_CODE,
  STATUS_TEXT,
};
