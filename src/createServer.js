// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
// server.js
const http = require('http');
const { convertToCase } = require('./convertToCase');
const errorMessages = require('./errorMessages');

function parseUrl(url) {
  return url.slice(1).split('?toCase=');
}

function validateRequest(splitUrl) {
  const errors = [];

  if (splitUrl[0] === '') {
    errors.push({ message: errorMessages.missingText });
  }

  if (splitUrl.length === 1) {
    errors.push({ message: errorMessages.missingCase });
  }

  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!supportedCases.includes(splitUrl[1]) && splitUrl.length !== 1) {
    errors.push({ message: errorMessages.unsupportedCase });
  }

  return errors;
}

function handleRequest(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;

  const splitUrl = parseUrl(req.url);
  const errors = validateRequest(splitUrl);

  if (errors.length > 0) {
    res.statusCode = 400;
    res.end(JSON.stringify({ errors }));
  } else {
    const { convertedText, originalCase } = convertToCase(
      ...splitUrl.slice(0, 2),
    );

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: splitUrl[1],
        originalText: splitUrl[0],
        convertedText,
      }),
    );
  }
}

function createServer() {
  return http.createServer(handleRequest);
}

module.exports = {
  createServer,
};
