/* eslint-disable max-len */

const getUrlErrors = (text, toCase) => {
  const errors = [];

  const isValidCase = (
    toCase === 'SNAKE'
    || toCase === 'KEBAB'
    || toCase === 'CAMEL'
    || toCase === 'PASCAL'
    || toCase === 'UPPER'
  );

  if (!text) {
    errors.push({
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (!isValidCase) {
    errors.push({
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return { errors };
};

module.exports = {
  getUrlErrors,
};
