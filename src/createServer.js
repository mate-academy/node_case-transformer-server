'use strict';

const http = require('http');
const { validate } = require('./validate');
const { convertToCase } = require('./convertToCase');
const { normalizeURL } = require('./normalizeURL');

function createServer() {
  const server = http.createServer((req, res) => {
    const { pathname, searchParams } = normalizeURL(req.url, `http://${req.headers.host}`);
    const text = pathname.slice(1);
    const toCase = searchParams.get('toCase');
    const errors = validate(text, toCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.writeHead(400, 'Bad request');
      // eslint-disable-next-line no-console
      errors.forEach(error => console.error(error));
      res.end('Wooops! Something went wrong 😢');
    }

    res.writeHead(200, 'OK');

    res.end(JSON.stringify({
      ...convertToCase(text, toCase),
      targetCase: toCase,
      originalText: text,
    }));
  });

  return server;
}

module.exports = { createServer };
