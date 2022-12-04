const SUPPORTED_CASE = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorsType = {
  missingText: 'Text to convert is required.'
+ ' '
+ 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missingParams: '"toCase" query param is required.'
  + ' '
  + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  caseNotSupported: 'This case is not supported.'
+ ' '
+ 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = {
  SUPPORTED_CASE,
  errorsType,
};
