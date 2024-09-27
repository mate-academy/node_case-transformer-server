function validate(targetCase, originalText) {
  const aviableCases = [
    'SNAKE',
    'KEBAB',
    'CAMEL',
    'PASCAL',
    'UPPER',
  ];

  const requestErrors = {
    errors: [],
  };

  if (!originalText) {
    requestErrors.errors.push({
      message: 'Text to convert is required.'
      + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!targetCase) {
    requestErrors.errors.push({
      message: '"toCase" query param is required.'
      + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (targetCase && !aviableCases.includes(targetCase)) {
    requestErrors.errors.push(
      {
        message: 'This case is not supported.'
        + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      }
      ,
    );
  }

  return requestErrors;
}

module.exports = {
  validate,
};
