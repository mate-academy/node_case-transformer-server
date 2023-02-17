// Write code here
'use strict';

const http = require('http');
const { hasErrors } = require('./hasErrors');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http:${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const errors = hasErrors(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.end(JSON.stringify({ errors }));
    } else {
      const converted = convertToCase(originalText, targetCase);

      res.end(JSON.stringify({
        ...converted,
        originalText,
        targetCase,
      }));
    }
  });

  return server;
}

module.exports = { createServer };
