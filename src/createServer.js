
const http = require('http');
const { convertToCase } = require('./convertToCase');

const { ServerError } = require('./types/ServerError');

function createServer() {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const url = new URL(request.url, 'http://localhost:3000');

    const convertCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const { pathname, searchParams } = url;

    const errors = [];

    const text = pathname.slice(1);

    const params = Object.fromEntries(searchParams.entries());

    if (text === '') {
      errors.push({
        message: ServerError.EmptyText,
      });
    }

    if (Object.keys(params).length === 0) {
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

    const { originalCase, convertedText } = convertToCase(text, params.toCase);

    response.end(JSON.stringify({
      convertedText,
      originalCase,
      originalText: text,
      targetCase: params.toCase,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
