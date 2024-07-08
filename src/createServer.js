// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase');

const validCasesNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const errors = [];
  const normalizedURL = new URL(req.url, 'http://localhost:5700');
  const toCaseParam = normalizedURL.searchParams.get('toCase');

  if (normalizedURL.pathname === '/') {
    errors.push({
      message:
        'Text to convert is required. ' +
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCaseParam) {
    errors.push({
      message:
        '"toCase" query param is required. ' +
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (toCaseParam && !validCasesNames.includes(toCaseParam)) {
    errors.push({
      message:
        'This case is not supported. ' +
        'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (errors.length > 0) {
    const errorResponse = {
      errors: errors,
    };

    res.statusCode = 400;
    res.end(JSON.stringify(errorResponse));

    return;
  }

  const text = normalizedURL.pathname.replace('/', '');
  const caseName = toCaseParam;

  const convertedText = convertToCase(text, caseName);

  const response = {
    originalCase: convertedText.originalCase,
    targetCase: caseName,
    originalText: text,
    convertedText: convertedText.convertedText,
  };

  res.statusCode = 200;
  res.end(JSON.stringify(response));
});

function createServer() {
  return server;
}

module.exports = { createServer };
