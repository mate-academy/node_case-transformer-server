const http = require('http');
const { convertToCase } = require('./convertToCase/index');
const { setError } = require('./setError');

const createServer = () => {
  const server = http.createServer((request, response) => {
    const normalizedURL = new URL(request.url, `http://${request.headers.host}`);

    const { pathname, searchParams } = normalizedURL;

    const originalText = pathname.slice(1);
    const targetCase = searchParams.get('toCase');

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const isSupportedCase = targetCase
      ? supportedCases.includes(targetCase.toUpperCase())
      : false;

    if (!originalText || !targetCase || !isSupportedCase) {
      const responseError = setError(originalText, targetCase, isSupportedCase);

      response.statusCode = 400;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(responseError));

      return;
    }

    const convertionResults = convertToCase(originalText, targetCase);
    const { originalCase, convertedText } = convertionResults;

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');

    const responseBody = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    response.end(JSON.stringify(responseBody));
  });

  return server;
};

module.exports = { createServer };
