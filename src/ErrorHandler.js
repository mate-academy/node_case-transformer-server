function errorHandler(
  textToConvert,
  errors,
  toCase,
  caseOptions,
) {
  if (!textToConvert) {
    errors.push({
      message:
        'Text to convert is required. '
        + 'Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message:
        '"toCase" query param is required. '
        + 'Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
    // eslint-disable-next-line no-prototype-builtins
  } else if (!caseOptions.hasOwnProperty(toCase)) {
    errors.push({
      message:
        'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

module.exports = { errorHandler };
