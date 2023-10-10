/* eslint-disable max-len */

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const correctRequest = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';

const errorMessages = {
  noText: `Text to convert is required. Correct request is: ${correctRequest}.`,
  noCase: `"toCase" query param is required. Correct request is: ${correctRequest}.`,
  unsupportedCase: `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
};

module.exports = { supportedCases, errorMessages };
