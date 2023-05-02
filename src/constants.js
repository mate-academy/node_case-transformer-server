const errorMessages = {
  noText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noToCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidToCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const toCases = [
  'SNAKE',
  'KEBAB',
  'CAMEL',
  'PASCAL',
  'UPPER',
];

module.exports.errorMessages = errorMessages;
module.exports.toCases = toCases;
