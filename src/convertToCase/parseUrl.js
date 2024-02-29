function parseUrl(url) {
  const urlRegex = /^\/([^\/]+)\?toCase=(\w+)$/;
  const match = url.match(urlRegex);

  if (!match) {
    throw new Error('Invalid URL format. Correct'
     + 'request format is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  }

  const inputText = match[1];
  const inputCase = match[2];

  if (!inputText) {
    throw new Error('Text to convert is required. Correct'
     + 'request format is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  }

  if (!inputCase) {
    throw new Error('"toCase" query param is required. Correct'
     + 'request format is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
  }

  const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!availableCases.includes(inputCase.toUpperCase())) {
    throw new Error(`This case is not supported. Available cases: ${availableCases.join(', ')}.`);
  }

  return {
    inputText,
    inputCase: inputCase.toUpperCase(),
  };
}

module.exports = {
  parseUrl,
};
