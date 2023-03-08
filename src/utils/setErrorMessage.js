'use strict';

const errors = [
  {
    message: 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  {
    message: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  {
    message: 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  },
];

const setErrorMessage = (originalText, targetCase) => {
  const payload = [];
  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!originalText) {
    payload.push(errors[0]);
  }

  if (!targetCase) {
    payload.push(errors[1]);
  }

  if (targetCase && !availableCases.includes(targetCase)) {
    payload.push(errors[2]);
  }

  return payload;
};

module.exports = { setErrorMessage };
