/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getErrorsFromUrl } = require('./getErrorsFromUrl');

function createServer() {
  return http.createServer((request, response) => {
    response.setHeader('Content-type', 'application/json');

    const normalizedUrl = new URL(request.url, `http://${request.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    const errors = getErrorsFromUrl(originalText, targetCase);

    if (errors.length) {
      response.statusCode = 400;
      response.statusMessage = 'Bad request';
      response.end(JSON.stringify({ errors }));
    }

    response.statusCode = 200;
    response.statusMessage = 'OK';

    const { originalCase, convertedText }
      = convertToCase(originalText, targetCase);

    const responseData = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    response.end(JSON.stringify(responseData));
  });
}

module.exports = {
  createServer,
};
