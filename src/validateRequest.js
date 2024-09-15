/* eslint-disable max-len */
function validateRequest(urlParts, validCases) {
  const errors = [];
  const textToConvert = decodeURIComponent(urlParts[0].slice(1));
  const params = new URLSearchParams(urlParts[1]);
  const toCase = params.get('toCase');

  if (!textToConvert) {
    errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!toCase) {
    errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (toCase && !validCases.includes(toCase)) {
    errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  return { errors, textToConvert, toCase };
}

module.exports = validateRequest;
