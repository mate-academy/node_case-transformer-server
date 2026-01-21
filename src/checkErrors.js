const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function checkErrors(originalText, toCase) {
  const errors = [];
  const noText = {
    message:
      'Text to convert is required. ' +
      'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  };
  const noToCase = {
    message:
      '"toCase" query param is required. ' +
      'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  };
  const noSuchCase = {
    message:
      'This case is not supported. ' +
      'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  };

  if (!originalText) {
    errors.push(noText);
  }

  if (!toCase) {
    errors.push(noToCase);
  } else if (!CASES.includes(toCase)) {
    errors.push(noSuchCase);
  }

  return errors;
}

module.exports = {
  checkErrors,
};
