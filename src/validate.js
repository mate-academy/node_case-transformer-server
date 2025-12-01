const AVAILABLE_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validate = (text, toCase) => {
  const errors = [];

  if (!text) {
    errors.push({
      message:
        'Text to convert is required. ' +
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message:
        '"toCase" query param is required. ' +
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (!AVAILABLE_CASES.includes(toCase)) {
    errors.push({
      message:
        'This case is not supported. ' +
        'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
};

module.exports = {
  validate,
};
