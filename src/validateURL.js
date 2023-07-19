/* eslint-disable max-len */
const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errors = {
  noText:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noToCase:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notSupported:
    `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
};

function validateURL(toCase, text) {
  return {
    errors: [
      ...!text
        ? [{ message: errors.noText }]
        : [],

      ...!toCase
        ? [{ message: errors.noToCase }]
        : [],

      ...!supportedCases.includes(toCase) && toCase
        ? [{ message: errors.notSupported }]
        : [],
    ],
  };
};

module.exports = {
  validateURL,
};
