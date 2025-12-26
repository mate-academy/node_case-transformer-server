const caseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

exports.caseName = caseName;

const errorMessage = {
  // eslint-disable-next-line max-len
  missingText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  // eslint-disable-next-line max-len
  missingParam: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  // eslint-disable-next-line max-len
  caseNotSupported: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

exports.errorMessage = errorMessage;
