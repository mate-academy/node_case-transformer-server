'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validate } = require('./validate');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const statusText = validate(text, toCase);

    if (statusText.errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify(statusText));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.end(JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
