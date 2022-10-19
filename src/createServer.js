
const http = require('http');
const { convertToCase } = require('./convertToCase');

const { serverError } = require('./constants/ServerError');

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
        message: serverError.EmptyText,
      });
    }

    if (!params.toCase) {
      errors.push({
        message: serverError.NoToCase,
      });
    } else if (!convertCases.includes(params.toCase)) {
      errors.push({
        message: serverError.InvalidToCase,
      });
    }

    if (errors.length) {
      response.statusCode = 400;
      response.statusText = 'Bad request';

      response.end(JSON.stringify({ errors }));

      return;
    }

    const targetCase = params.toCase;

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    response.statusCode = 200;

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
