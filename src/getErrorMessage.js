/* eslint-disable max-len */
const getErrorMessage = (textPart, toCase) => {
  const errorMessage = { errors: [] };

  if (textPart === '/') {
    errorMessage.errors.push({
      message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (toCase === null) {
    errorMessage.errors.push({
      message:
        '`toCase` query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (
    toCase !== 'SNAKE' &&
    toCase !== 'KEBAB' &&
    toCase !== 'CAMEL' &&
    toCase !== 'PASCAL' &&
    toCase !== 'UPPER'
  ) {
    errorMessage.errors.push({
      message:
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errorMessage;
};

module.exports = { getErrorMessage };
