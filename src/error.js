/* eslint-disable max-len */
const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const invalidText =
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const invalidToCase =
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const invalidToCaseValue = `This case is not supported. Available cases: ${supportedCases.join(', ')}.`;

module.exports = {
  invalidText,
  invalidToCase,
  invalidToCaseValue,
  supportedCases,
};
