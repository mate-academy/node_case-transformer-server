const requestFormat = '/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>';
const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const findErrors = (textToConvert, toCase) => {
  const errors = [];

  if (!textToConvert) {
    errors.push({
      message: `Text to convert is required. Correct request is: "${requestFormat}".`,
    });
  }

  if (!toCase) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: "${requestFormat}".`,
    });
  }

  if (toCase && !availableCases.includes(toCase)) {
    errors.push({
      message: `This case is not supported. Available cases: ${availableCases.join(', ')}.`,
    });
  }

  return errors;
};

module.exports = {
  findErrors,
};
