/* eslint-disable max-len */
'use strict';

const errors = [
  {
    message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  {
    message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  {
    message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  },
];

const validateErrors = (url, toCase) => {
  const errorMassage = [];

  if (!url.length) {
    errorMassage.push(errors[0]);
  }

  if (!toCase) {
    errorMassage.push(errors[1]);
  } else if (!['SNAKE', 'KEBAB', 'PASCAL', 'CAMEL', 'UPPER'].includes(toCase)) {
    errorMassage.push(errors[2]);
  }

  return errorMassage;
};

module.exports.validateErrors = validateErrors;
