/* eslint-disable max-len */
function validateRequest(text, toCase) {
  const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = {
    errors: [],
  };

  if (!text) {
    errors.errors.push({
      message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.errors.push({
      message:
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (!SUPPORTED_CASES.includes(toCase)) {
    errors.errors.push({
      message:
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

module.exports = { validateRequest };
