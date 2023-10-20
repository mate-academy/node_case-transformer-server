/* eslint-disable max-len */
const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const correctRequestText = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const availableCases = `Available cases: ${supportedCases.join(', ')}.`;

module.exports = {
  supportedCases,
  correctRequestText,
  availableCases,
};
