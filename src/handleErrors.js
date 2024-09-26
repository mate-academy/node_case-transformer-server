const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const correctRequest = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

function handleErrors(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({ message: `Text to convert is required. Correct request is: ${correctRequest}` });
  }

  if (!toCase) {
    errors.push({ message: `"toCase" query param is required. Correct request is: ${correctRequest}` });
  }

  if (!cases.includes(toCase) && toCase) {
    errors.push({ message: `This case is not supported. Available cases: ${cases.join(', ')}.` });
  }

  return errors;
}

module.exports = { handleErrors };
