/* eslint-disable max-len */
const errorMessages = [
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

const checkErrors = (url, toCase) => {
  const errorMessage = [];
  const cases = ['SNAKE', 'KEBAB', 'PASCAL', 'CAMEL', 'UPPER'];

  if (!url.length) {
    errorMessage.push(errorMessages[0]);
  }

  if (!toCase) {
    errorMessage.push(errorMessages[1]);
  }

  if (!cases.includes(toCase) && toCase) {
    errorMessage.push(errorMessages[2]);
  }

  return errorMessage;
};

module.exports = {
  checkErrors,
};
