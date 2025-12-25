'use strict';

const http = require('http');
const { validateQuery } = require('./validateQuery/validateQuery');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((request, response) => {
    const normalizedUrl = new URL(request.url, `http://${request.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    response.setHeader('Content-Type', 'application/json');

    const errors = validateQuery(originalText, targetCase);

    if (errors) {
      response.statusCode = 400;
      response.statusMessage = 'Bad request';

      response.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    response.statusCode = 200;
    response.statusMessage = 'OK';

    response.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

  return server;
}

module.exports = { createServer };
