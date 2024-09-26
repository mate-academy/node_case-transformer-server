const TRANSFORM_FORMATS_URL = [
  'SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER',
];

function dataValidate(options) {
  const { originalText, targetCase } = options;
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

  if (
    targetCase
    && !TRANSFORM_FORMATS_URL.includes(targetCase)
  ) {
    errors.push({
      message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

module.exports = {
  dataValidate,
};
