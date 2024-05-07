/* eslint-disable max-len */
// src/createServer.js
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { errorMessage } = require('./errorMessage');

const PORT = 5700;

function createServer() {
  const server = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(
      `http://localhost:${PORT}${req.url}`,
    );

    const text = pathname.substring(1);
    const toCase = searchParams.get('toCase');

    const errorM = errorMessage(text, toCase);

    if (errorM) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors: errorM.errors }));

      return;
    }

    let convertedValue;

    try {
      convertedValue = convertToCase(text, toCase);
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors: error.message }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: convertedValue.originalCase,
        targetCase: toCase.toUpperCase(),
        convertedText: convertedValue.convertedText,
        originalText: text,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
