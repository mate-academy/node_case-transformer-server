/* eslint-disable no-console */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase');
const { hendleError } = require('./hendleError');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizeURL = new URL(req.url, `http://${req.headers.host}`);

    const targetCase = normalizeURL.searchParams.get('toCase');
    const originalText = normalizeURL.pathname.slice(1);

    const errors = hendleError(originalText, targetCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      ...convertToCase(originalText, targetCase),
      originalText,
      targetCase,
    }));
  });
}

createServer();

module.exports.createServer = createServer;
