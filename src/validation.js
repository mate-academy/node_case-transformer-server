/* eslint-disable max-len */
const validateParams = (textToConvert, toCase) => {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  if (!textToConvert) {
    const message = {
      message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    };

    errors.push(message);
  }

  if (!toCase) {
    const message = {
      message:
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    };

    errors.push(message);
  }

  if (toCase && !cases.includes(toCase)) {
    const message = {
      message:
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    };

    errors.push(message);
  }

  return errors;
};

module.exports = {
  validateParams,
};
