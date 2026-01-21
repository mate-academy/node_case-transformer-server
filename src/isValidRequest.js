/* eslint-disable max-len */
'use strict';

const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function isValidRequest(text, toCase) {
  const statusText = {
    errors: [],
  };

  if (!text) {
    statusText.errors.push({
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    statusText.errors.push({
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!(allowedCases.includes(toCase)) && toCase) {
    statusText.errors.push({
      message: `This case is not supported. Available cases: ${allowedCases.join(', ')}.`,
    });
  }

  return statusText;
}

module.exports = {
  isValidRequest,
};
