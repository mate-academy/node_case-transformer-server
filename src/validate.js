function validate(originalText, toCase) {
  const isTextValid = originalText.length;
  const arrayOfErrors = [];

  if (!isTextValid) {
    arrayOfErrors.push({
      // eslint-disable-next-line max-len
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    arrayOfErrors.push({
      // eslint-disable-next-line max-len
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  const arrayOfCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!arrayOfCases.includes(toCase) && toCase) {
    arrayOfErrors.push({
      // eslint-disable-next-line max-len
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (arrayOfErrors.length !== 0) {
    return {
      errors: arrayOfErrors,
    };
  }
}

module.exports = {
  validate,
};
