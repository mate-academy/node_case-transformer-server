const validate = (toCase, pathname) => {
  const errors = [];
  const transformations = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const transformationsString = transformations.join(', ');

  if (pathname.length === 0) {
    errors.push({
      message:
        'Text to convert is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message:
        '"toCase" query param is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (toCase && !transformations.includes(toCase)) {
    errors.push({
      message: `This case is not supported. Available cases: ${transformationsString}.`,
    });
  }

  return errors;
};

module.exports = {
  validate,
};
