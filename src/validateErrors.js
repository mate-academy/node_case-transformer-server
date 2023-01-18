/* eslint-disable max-len */
'use strict';

const errorMessages = Object.freeze({
  noText: 'Text to convert is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noCase: '"toCase" query param is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  wrongCase: 'This case is not supported. '
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
});

const validateErrors = (url, toCase) => {
  const errorMessage = [];

  if (!url.length) {
    errorMessage.push({ message: errorMessages.noText });
  }

  if (!toCase) {
    errorMessage.push({ message: errorMessages.noCase });
  } else if (!['SNAKE', 'KEBAB', 'PASCAL', 'CAMEL', 'UPPER'].includes(toCase)) {
    errorMessage.push({ message: errorMessages.wrongCase });
  }

  return errorMessage;
};

module.exports = { validateErrors };
