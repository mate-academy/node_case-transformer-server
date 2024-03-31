/* eslint-disable max-len */
const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function getError(text, targetCase) {
  const errors = [];

  if (!text) {
    errors.push({
      message:
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!targetCase) {
    errors.push({
      message:
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (targetCase && !supportedCases.includes(targetCase)) {
    errors.push({
      message:
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

module.exports = { getError };
