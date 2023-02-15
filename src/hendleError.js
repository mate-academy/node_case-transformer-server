function hendleError(text, type) {
  const toCaseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  if (type && !toCaseTypes.includes(type)) {
    errors.push({
      message: 'This case is not supported.'
        + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (!type) {
    errors.push({
      message: '"toCase" query param is required. Correct request is: '
      + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!text) {
    errors.push({
      message: 'Text to convert is required. Correct request is: '
       + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  return errors;
}

module.exports.hendleError = hendleError;
