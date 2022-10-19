
const http = require('http');
const { convertToCase } = require('./convertToCase');

const { ServerError } = require('./types/ServerError');

function createServer() {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const url = new URL(request.url, `http://${request.headers.host}`);

    const convertCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const { pathname, searchParams } = url;

    const errors = [];

    const originalText = pathname.slice(1);

    const params = Object.fromEntries(searchParams.entries());

    if (originalText === '') {
      errors.push({
        message: ServerError.EmptyText,
      });
    }

    if (!params.toCase) {
      errors.push({
        message: ServerError.NoToCase,
      });
    } else if (!convertCases.includes(params.toCase)) {
      errors.push({
        message: ServerError.InvalidToCase,
      });
    }

    if (errors.length) {
      response.end(JSON.stringify({ errors }));

      return;
    }

    const targetCase = params.toCase;

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    response.end(JSON.stringify({
      convertedText,
      originalCase,
      originalText,
      targetCase,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
