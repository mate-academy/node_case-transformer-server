const CASE = {
  SNAKE: 'SNAKE',
  KEBAB: 'KEBAB',
  CAMEL: 'CAMEL',
  PASCAL: 'PASCAL',
  UPPER: 'UPPER',
};

const validateData = (text, toCase) => {
  const errors = [];

  if (!text) {
    errors.push({
      message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (toCase && !CASE[toCase]) {
    errors.push({
      message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
};

module.exports = {
  validateData,
}