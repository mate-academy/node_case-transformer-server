/* eslint-disable max-len */

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorCases = {
  noText: {
    message:
      'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  noToCase: {
    message:
      '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  invalidToCase: {
    message:
      'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  },
};

const checkRequest = (text, toCase) => {
  const errors = [];

  if (!text) {
    errors.push(errorCases.noText);
  }

  if (!toCase) {
    errors.push(errorCases.noToCase);

    return errors;
  }

  if (!supportedCases.includes(toCase)) {
    errors.push(errorCases.invalidToCase);
  }

  return errors;
};

module.exports = { checkRequest };
