// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
// const { URL } = require('url');
const { convertToCase } = require('./convertToCase/convertToCase');

function validateRequest(req) {
  const urlParts = req.url.split('?');
  const textToConvert = urlParts[0].substring(1); // Remove leading '/'
  const queryString = urlParts[1] || '';
  const params = new URLSearchParams(queryString);
  const toCase = params.get('toCase');

  const errors = [];

  if (!textToConvert) {
    errors.push({
      message:
        'Text to convert is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message:
        '"toCase" query param is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else {
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!supportedCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, ' +
          'PASCAL, UPPER.',
      });
    }
  }

  return errors.length > 0 ? errors : null;
}

const createServer = () => {
  const server = http.createServer((req, res) => {
    // Validate using the complete req object
    const validationErrors = validateRequest(req);

    // Extract text and query string from URL
    const [text, queryString] = req.url.split('?');
    const trimmedText = text.slice(1);

    if (validationErrors) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors: validationErrors }));

      return;
    }

    const toCase = new URLSearchParams(queryString).get('toCase');
    const result = convertToCase(trimmedText, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: trimmedText,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
};

module.exports = { createServer };
