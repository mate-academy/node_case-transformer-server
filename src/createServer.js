const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { handleError } = require('./errorHandler');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    res.setHeader('Content-Type', 'application/json');

    const errorResponse = { errors: [] };

    const text = normalizedUrl.pathname.replace('/', '');
    const caseName = normalizedUrl.searchParams.get('toCase');

    handleError(text, errorResponse, caseName);

    if (errorResponse.errors.length !== 0) {
      throwErrors(res, errorResponse);

      return;
    }

    res.statusCode = 200;
    res.end(JSON.stringify(convertToResponse(text, caseName)));
  });
}

function throwErrors(res, errorResponse) {
  res.statusCode = 400;
  res.end(JSON.stringify(errorResponse));
}

function convertToResponse(text, caseName) {
  const convertedText = convertToCase(text, caseName);

  return {
    originalText: text,
    targetCase: caseName,
    ...convertedText,
  };
}

module.exports = { createServer };
