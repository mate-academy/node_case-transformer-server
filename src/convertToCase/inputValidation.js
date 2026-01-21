const allCases = ['SNAKE', 'KEBAB', 'UPPER', 'CAMEL', 'PASCAL'];

function inputValidation(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push({
      message:
        // eslint-disable-next-line max-len
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!targetCase) {
    errors.push({
      message:
        // eslint-disable-next-line max-len
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (!allCases.includes(targetCase.toUpperCase())) {
    errors.push({
      message:
        // eslint-disable-next-line max-len
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

module.exports = {
  inputValidation,
};
