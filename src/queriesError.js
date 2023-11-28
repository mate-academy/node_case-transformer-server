/* eslint-disable max-len */
const Case = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const queriesError = (textToConvert, toCase) => {
  const error = {
    status: 400,
    statusText: 'Bad request',
    payload: {
      errors: [],
    },
  };

  if (!textToConvert) {
    error.payload.errors.push({
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    error.payload.errors.push({
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (toCase && !Case.includes(toCase)) {
    error.payload.errors.push({
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return error;
};

module.exports = {
  queriesError,
};
