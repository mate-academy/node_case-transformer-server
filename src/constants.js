const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessages = {
  // eslint-disable-next-line max-len
  missingText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  // eslint-disable-next-line max-len
  missingToCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  // eslint-disable-next-line max-len
  invalidToCase: `This case is not supported. Available cases: ${cases.join(', ')}.`,
};

module.exports = { cases, errorMessages };
