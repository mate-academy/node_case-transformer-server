// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const PORT = 5700;
const { convertToCase } = require('./convertToCase/convertToCase');
const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const { pathname, searchParams } = url;
    const errors = [];
    const TEXT_TO_CONVERT = pathname.slice(1);
    const CASE_NAME = searchParams.get('toCase');
    const correctType = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    res.setHeader('Content-Type', 'application/json');

    if (!TEXT_TO_CONVERT) {
      errors.push({
        message: `Text to convert is required. Correct request is: ${correctType}`,
      });
    }

    if (!CASE_NAME) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: ${correctType}`,
      });
    } else if (!cases.includes(CASE_NAME)) {
      errors.push({
        message: `This case is not supported. Available cases: ${cases.join(', ')}.`,
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      TEXT_TO_CONVERT,
      CASE_NAME,
    );

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase: originalCase,
        targetCase: CASE_NAME,
        originalText: TEXT_TO_CONVERT,
        convertedText: convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer, PORT };
