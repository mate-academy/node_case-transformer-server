const CASES = {
  SNAKE: 'SNAKE',
  KEBAB: 'KEBAB',
  CAMEL: 'CAMEL',
  PASCAL: 'PASCAL',
  UPPER: 'UPPER',
};

const VALID_CASES = {
  SNAKE: 'snake_case',
  KEBAB: 'kebab-case',
  CAMEL: 'camelCase',
  PASCAL: 'PascalCase',
  UPPER: 'UPPER_CASE',
};

const ERROR_MESSAGES = {
  TEXT_REQUIRED: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  QUERY_REQUIRED: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  CASE_NOT_SUPPORTED: 'This case is not supported. Available cases:',
};

module.exports = {
  CASES,
  VALID_CASES,
  ERROR_MESSAGES,
};
