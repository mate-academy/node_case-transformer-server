/* eslint-disable max-len */
const cases = [
  'SNAKE',
  'KEBAB',
  'CAMEL',
  'PASCAL',
  'UPPER',
];

function getValidationErrors(textToConvert, toCase) {
  const validationErrors = [];

  if (!textToConvert) {
    validationErrors.push({
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    validationErrors.push({
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (toCase && !cases.includes(toCase)) {
    validationErrors.push({
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return validationErrors;
}

module.exports = { getValidationErrors };
