const ERROR_TEXT_MISSING = {
  message: 'Text to convert is required. '
  + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
};

const ERROR_TOCASE_MISSING = {
  message: '"toCase" query param is required. '
  + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
};

const ERROR_TOCASE_INVALID = {
  message: 'This case is not supported. '
  + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = {
  ERROR_TEXT_MISSING,
  ERROR_TOCASE_MISSING,
  ERROR_TOCASE_INVALID,
};
