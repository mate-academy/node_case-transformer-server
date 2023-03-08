'use strict';

const errorCases = [
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

const getErrors = (currText, toCase) => {
  const payload = [];
  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!currText) {
    payload.push(errorCases[0]);
  }

  if (!toCase) {
    payload.push(errorCases[1]);
  }

  if (toCase && !availableCases.includes(toCase)) {
    payload.push(errorCases[2]);
  }

  return payload;
};

module.exports = { getErrors };
