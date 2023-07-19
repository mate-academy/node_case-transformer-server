const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validate } = require('./convertToCase/validate');

module.exports = { validate };

function createServer() {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(request.url, `http://${request.headers.host}`);

    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    const errors = validate(originalText, targetCase);

    if (errors.length > 0) {
      response.statusCode = 400;
      response.statusMessage = 'Bad request';
      response.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    response.statusCode = 200;
    response.statusMessage = 'OK';

    response.end(JSON.stringify(result));
  });

  return server;
}

module.exports = { createServer };
