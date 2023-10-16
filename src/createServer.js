const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase')
const { getError } = require('./errors');

function createServer() {
  const server = http.createServer((request, response) => {
    const requestURL = new URL(request.url, 'http://localhost:5700');

    response.setHeader('Content-Type', 'application/json');

    const originalText = requestURL.pathname.slice(1);
    const targetCase = requestURL.searchParams.get('toCase');
    const errors = getError(originalText, targetCase);

    if (errors.errors.length) {
      response.write(JSON.stringify(errors));
      response.statusCode = 400;
      response.statusMessage = 'Bad request';
      response.end();

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    response.statusCode = 200;
    response.statusMessage = 'OK';

    response.write(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));

    response.end();
  });

  return server;
}

module.exports = { createServer };
