// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { validateData } = require('./validateData');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const textToChange = url.pathname.slice(1);

    const toCase = url.searchParams.get('toCase');

    const errors = validateData(textToChange, toCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToChange, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToChange,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
