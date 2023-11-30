/* eslint-disable max-len */
const CASE_NAME = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function setError({ caseName, text }) {
  const error = {
    errors: [],
  };

  if (!CASE_NAME.includes(caseName) && caseName) {
    error.errors.push({
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (!caseName) {
    error.errors.push({
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!text) {
    error.errors.push({
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  return error;
}

module.exports = {
  setError,
};
