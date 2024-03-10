const correctRequest = '/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>';
const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function findErrors(textToConvert, toCase) {
  const errors = [];

  if (!textToConvert) {
    errors.push({
      message: `Text to convert is required. Correct request is: "${correctRequest}".`,
    });
  }

  if (!toCase) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: "${correctRequest}".`,
    });
  }

  if (toCase && !availableCases.includes(toCase)) {
    errors.push({
      // eslint-disable-next-line max-len
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

module.exports = {
  findErrors,
};
