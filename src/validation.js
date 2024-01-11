const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validation = (text, caseName) => {
  const errors = [];
  const isCorrectCase = CASES.includes(caseName);

  if (!text) {
    errors.push({
      message:
      'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!caseName) {
    errors.push({
      message:
      '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!isCorrectCase && caseName) {
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

module.exports = { validation };
