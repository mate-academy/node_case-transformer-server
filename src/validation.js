const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateURL(text, caseName) {
  const errors = [];

  if (!text) {
    errors.push({
      message: 'Text to convert is required. '.concat(
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      ),
    });
  }

  if (!caseName) {
    errors.push({
      message: '"toCase" query param is required. '.concat(
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      ),
    });
  }

  if (!cases.includes(caseName) && caseName) {
    errors.push({
      message: 'This case is not supported. '.concat(
        'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      ),
    });
  }

  return errors;
}

module.exports = { validateURL };
