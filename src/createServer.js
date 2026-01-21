/* eslint-disable no-console */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { errorsList } = require('./convertToCase/errorsList');

// const PORT = process.env.PORT || 5700;

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = url.pathname.slice(1);
    const caseName = url.searchParams.get('toCase');
    const errors = [];

    if (!textToConvert) {
      errors.push({ message: errorsList.textIsMissing });
    }

    if (!caseName) {
      errors.push({ message: errorsList.caseIsMissing });
    }

    if (caseName && !SUPPORTED_CASES.includes(caseName)) {
      errors.push({ message: errorsList.caseIsNotSupported });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusMessage = 'Bad request';
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, caseName);

    res.statusMessage = 'OK';
    res.statusCode = 200;

    res.end(
      JSON.stringify({
        targetCase: caseName,
        originalText: textToConvert,
        ...result,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
