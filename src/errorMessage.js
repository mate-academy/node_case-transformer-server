const errorMessage = {
  textEmpty: 'Text to convert is required. Correct request is: '
  + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseEmpty: '"toCase" query param is required. Correct request is: '
  + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  toCaseNotValid: 'This case is not supported. Available cases: '
  + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = { errorMessage };
