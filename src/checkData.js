const checkData = (text, caseName) => {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errorRequest = {
    errors: [],
  };

  if (!text) {
    errorRequest.errors.push({
      message: 'Text to convert is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!caseName) {
    errorRequest.errors.push({
      message: '"toCase" query param is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });

    return errorRequest;
  }

  if (!cases.includes(caseName)) {
    errorRequest.errors.push({
      message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errorRequest;
};

module.exports = { checkData };
