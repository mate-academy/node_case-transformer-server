const casesTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function catchErrors(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({
      message: 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!casesTypes.includes(toCase) && toCase) {
    errors.push({
      message: `This case is not supported. Available cases: ${casesTypes.join(', ')}.`,
    });
  }

  return errors;
}

module.exports = { catchErrors };
