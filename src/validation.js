const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const validateParams = (text, caseName) => {
  const errors = [];

  if (text === '') {
    errors.push({
      message:
        'Text to convert is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (caseName === null) {
    errors.push({
      message:
        '"toCase" query param is required. '
         + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!CASES.includes(caseName) && caseName) {
    errors.push({
      message:
        'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (errors.length > 0) {
    throw errors;
  }
};

module.exports = {
  validateParams,
};
