// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const ERROR_MESSAGES = {
  NO_TEXT:
    'Text to convert is required. ' +
    'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_CASE:
    '"toCase" query param is required. ' +
    'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  INVALID_CASE:
    'This case is not supported. ' +
    'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function createServer() {
  return http.createServer((req, res) => {
    const url = req.url;
    const textString = url.split('?')[0];
    const normalizedText = textString.startsWith('/')
      ? textString.slice(1)
      : textString;

    const queryString = url.split('?')[1] || '';
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = validateRequest(normalizedText, toCase);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }, null, 2));

      return;
    }

    const result = convertToCase(normalizedText, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: normalizedText,
        convertedText: result.convertedText,
      }),
    );
  });
}

function validateRequest(normalizedText, toCase) {
  const errors = [];

  if (!normalizedText) {
    errors.push({ message: ERROR_MESSAGES.NO_TEXT });
  }

  if (!toCase) {
    errors.push({ message: ERROR_MESSAGES.NO_CASE });
  }

  if (toCase && !CASES.includes(toCase)) {
    errors.push({ message: ERROR_MESSAGES.INVALID_CASE });
  }

  return errors;
}

module.exports = {
  createServer,
};
