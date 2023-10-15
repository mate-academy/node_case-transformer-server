const AVAILBLE_TRANSFORM = [
  'SNAKE',
  'KEBAB',
  'CAMEL',
  'PASCAL',
  'UPPER',
];

function validateData(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push({
      message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!targetCase) {
    errors.push({
      message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (targetCase
    && !AVAILBLE_TRANSFORM.includes(targetCase)) {
    errors.push({
      message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

module.exports = {
  validateData,
};
