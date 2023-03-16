/* eslint-disable max-len */
'use strict';

const errorMessages = [
  {
    message:
      'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  {
    message:
      '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  {
    message:
      'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  },
];

const checkErrors = (textToConvert, toCase) => {
  const errors = [];

  if (!textToConvert) {
    errors.push(errorMessages[0]);
  }

  if (!toCase) {
    errors.push(errorMessages[1]);
  }

  if (
    !['UPPER', 'SNAKE', 'PASCAL', 'CAMEL', 'KEBAB'].includes(toCase)
    && toCase
  ) {
    errors.push(errorMessages[2]);
  }

  return errors;
};

module.exports = { checkErrors };
