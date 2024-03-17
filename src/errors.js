const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function findErrors(textToConvert, targetCase) {
  const errors = [];

  if (!textToConvert) {
    errors.push({
      message: 'Text to convert is required.'
       + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!targetCase) {
    errors.push({
      message: '"toCase" query param is required.'
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (targetCase && !availableCases.includes(targetCase)) {
    errors.push({
      message: 'This case is not supported.'
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
};

module.exports = {
  findErrors,
};
