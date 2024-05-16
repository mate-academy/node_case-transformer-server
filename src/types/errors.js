const ERROR_MESSAGES = {
  TO_CASE_REQUIRED: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  TEXT_REQUIRED: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  CASE_NOT_SUPPORTED: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
};

module.exports = { ERROR_MESSAGES };
