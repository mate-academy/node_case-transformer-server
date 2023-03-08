const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessages = {
  missingText: 'Text to convert is required.'
  + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missingToCase: '"toCase" query param is required.'
  + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  incorrectToCase: 'This case is not supported.'
  + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = { validCases, errorMessages };
