/* eslint-disable max-len */
const { convertToCase } = require('./convertToCase');

const findError = (text, toCase) => {
  const responseError = {
    errors: [],
  };

  if (!text) {
    responseError.errors.push({
      message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    responseError.errors.push({
      message:
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (toCase) {
    try {
      convertToCase(text, toCase);
    } catch (error) {
      responseError.errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }
  }

  return responseError;
};

module.exports = { findError };
