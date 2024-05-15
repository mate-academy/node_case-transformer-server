/* eslint-disable max-len */
const AVAILABLE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateParams(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({
      message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message:
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!AVAILABLE_CASES.includes(toCase) && toCase) {
    errors.push({
      message:
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (errors.length) {
    throw errors;
  }
}

module.exports = { validateParams };
