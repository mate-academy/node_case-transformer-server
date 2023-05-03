const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const urlFormat = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';

function validateParams(textToConvert, toCase) {
  const errors = [];

  if (!textToConvert) {
    errors.push({ message: `Text to convert is required. Correct request is: ${urlFormat}.` });
  }

  if (!toCase) {
    errors.push({ message: `"toCase" query param is required. Correct request is: ${urlFormat}.` });
  }

  if (!cases.includes(toCase) && toCase) {
    errors.push({ message: `This case is not supported. Available cases: ${cases.join(', ')}.` });
  }

  return errors;
}

module.exports = { validateParams };
