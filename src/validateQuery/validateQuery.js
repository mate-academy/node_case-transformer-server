'use strict';

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const errorMessage = {
  // eslint-disable-next-line max-len
  noText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  // eslint-disable-next-line max-len
  noToCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  // eslint-disable-next-line max-len
  invalidToCase: `This case is not supported. Available cases: ${cases.join(', ')}.`,
};

const getErrorObject = (message) => ({
  message,
});

function validateQuery(textToConvert, toCase) {
  const errors = [];

  if (!textToConvert) {
    errors.push(getErrorObject(errorMessage.noText));
  }

  if (!toCase) {
    errors.push(getErrorObject(errorMessage.noToCase));
  }

  if (toCase && !cases.includes(toCase)) {
    errors.push(getErrorObject(errorMessage.invalidToCase));
  }

  return errors.length ? errors : null;
};

module.exports = { validateQuery };
