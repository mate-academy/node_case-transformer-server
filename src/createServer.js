/* eslint-disable max-len */
const http = require('http');
const { catchError } = require('./catchError');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [text, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const errors = catchError(text, toCase);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const textToConvert = text.slice(1);
    const result = convertToCase(textToConvert, toCase);

    res.writeHead(200, { 'Content-type': 'application/json' });

    res.end(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    }));
  });

  return server;
}

module.exports = { createServer };
