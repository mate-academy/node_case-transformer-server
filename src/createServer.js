const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateParams, sendError } = require('./validation');

const createServer = () => {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const { pathname, searchParams } = new URL(request.url, `http://${request.headers.host}`);
    const text = pathname.slice(1);
    const toCase = searchParams.get('toCase');

    const errorMessages = validateParams(text, toCase);

    if (errorMessages.length) {
      return sendError(response, 400, errorMessages);
    }

    const {
      convertedText,
      originalCase,
    } = convertToCase(text, toCase);

    const responseBody = {
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    };

    response.statusCode = 200;
    response.end(JSON.stringify(responseBody));
  });

  return server;
};

module.exports = {
  createServer,
};
