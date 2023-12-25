/* eslint-disable max-len */
const errors = {
  textmissing: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  caseMissing: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notSupportedCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const returnError = (text, toCase) => {
  const error = [];

  if (!text) {
    error.push({
      message: errors.textmissing,
    });
  }

  if (!toCase) {
    error.push({
      message: errors.caseMissing,
    });
  }

  if (!supportedCases.includes(toCase) && toCase) {
    error.push({
      message: errors.notSupportedCase,
    });
  }

  return error;
};

module.exports = { returnError };
