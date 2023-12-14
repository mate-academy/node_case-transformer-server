/* eslint-disable quote-props */
/* eslint-disable max-len */
const { convertToCase } = require('./convertToCase');
const { supportedCases } = require('./supportedCases');

const createServer = () => {
  const http = require('http');

  const errorMessages = {
    missingText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"',
    missingToCaseQueryParam: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"',
    unsupportedCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER',
  };

  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const errors = [];
    const url = new URL(req.url, 'http://localhost:4000');
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    if (!originalText) {
      errors.push({ message: errorMessages.missingText });
    }

    if (!targetCase) {
      errors.push({ message: errorMessages.missingToCaseQueryParam });
    } else {
      if (!supportedCases.includes(targetCase)) {
        errors.push({ message: errorMessages.unsupportedCase });
      }
    }

    // Check for both missing text and invalid toCase
    if (!originalText && !targetCase) {
      errors.push({ message: errorMessages.missingText });
      errors.push({ message: errorMessages.unsupportedCase });
    }

    if (errors.length) {
      res.statusCode = 400;

      return res.end(JSON.stringify({
        errors: errors.map(error => ({ message: error.message + '.' })),
      }));
    }

    const { originalCase, convertedText } = convertToCase(originalText, targetCase);

    const data = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  });

  return server;
};

module.exports = { createServer };
