const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function isValidRequest(text, searchProperty, searchParam) {
  let error = false;
  let message = '';
  const templateText = '/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>';

  if (!text) {
    error = true;
    message = `Text to convert is required. Correct request is: "${templateText}".`;
  }

  if (searchProperty !== 'toCase') {
    error = true;
    message = `"toCase" query param is required. Correct request is: "${templateText}".`;
  }

  if (!cases.includes(searchParam)) {
    error = true;
    message = `This case is not supported. Available cases: ${cases.join(', ')}.`;
  }

  return {
    error,
    message,
  };
}

module.exports = {
  isValidRequest,
};
