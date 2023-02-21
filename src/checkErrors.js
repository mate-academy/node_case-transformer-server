const checkErrors = (text, toCase) => {
  const caseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  if (!text) {
    errors.push({
      message:
        'Text to convert is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message:
        '"toCase" query param is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  };

  if (toCase && !(caseNames.includes(toCase))) {
    errors.push({
      message:
        'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  };

  return errors;
};

module.exports = {
  checkErrors,
};
