'use strict';

const urlParamsPreValidation = (textToConvert, targetCase) => {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const caughtErrors = {
    errors: [],
  };

  const validCase = cases.find(c => c === targetCase);

  if (!targetCase) {
    caughtErrors.errors.push({
      // eslint-disable-next-line max-len
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (targetCase && !validCase) {
    caughtErrors.errors.push({
      // eslint-disable-next-line max-len
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (!textToConvert) {
    caughtErrors.errors.push({
      // eslint-disable-next-line max-len
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  return caughtErrors;
};

module.exports = { urlParamsPreValidation };
