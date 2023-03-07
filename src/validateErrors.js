/* eslint-disable max-len */
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
  const errorMessage = [];

  if (!url.length) {
    errorMessage.push(errors[0]);
  }

  if (!toCase) {
    errorMessage.push(errors[1]);
  }

  if (!['SNAKE', 'KEBAB', 'PASCAL', 'CAMEL', 'UPPER'].includes(toCase) && toCase) {
    errorMessage.push(errors[2]);
  }

  return errorMessage;
};

module.exports = {
  validateErrors,
};
