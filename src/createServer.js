/* eslint-disable no-console */
const http = require('http');

const { TO_CASE } = require('./constants');
const { getRequestErrors } = require('./getRequestErrors');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get(TO_CASE) || '';

    const errors = getRequestErrors(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const response = {
      ...convertToCase(originalText, targetCase),
      targetCase,
      originalText,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = { createServer };
