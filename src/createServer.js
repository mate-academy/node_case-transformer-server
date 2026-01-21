'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { isValidData } = require('./isValidData.js');

function createServer() {
  return http.createServer((request, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizeURL = new URL(request.url, `http://${request.headers.host}`);
    const originalText = normalizeURL.pathname.slice(1);
    const targetCase = normalizeURL.searchParams.get('toCase');

    const errors = isValidData(originalText, targetCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    const resultOfConverting = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      ...resultOfConverting,
      originalText,
      targetCase,
    }));
  });
}

module.exports = { createServer };
