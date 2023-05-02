'use strict';

const http = require('node:http');
const { convertToCase } = require('./convertToCase');
const { getErrors } = require('./getErrors');

const createServer = () => {
  return http.createServer((req, res) => {
    const {
      pathname,
      searchParams,
    } = new URL(req.url, `http://${req.headers.host}`);
    const originalText = pathname.slice(1);
    const targetCase = searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = getErrors(originalText, targetCase);

    if (errors.length) {
      res.writeHead(400, 'Bad request');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });
};

module.exports = { createServer };
