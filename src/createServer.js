/* eslint-disable max-len */

const http = require('http');
const { validateParams } = require('./validateParams');
const { normalizeUrl } = require('./normalizeUrl');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((request, response) => {
    const { toCase, textToConvert } = normalizeUrl(request.url, request.headers.host);
    const validation = validateParams(textToConvert, toCase);

    if (validation.errors.length) {
      response.writeHead(400, { 'Content-Type': 'application/json' });

      return response.end(JSON.stringify(validation));
    }

    const { originalCase, convertedText } = convertToCase(textToConvert, toCase);

    response.writeHead(200, { 'Content-Type': 'application/json' });

    return response.end(JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText,
    }));
  });

  return server;
};

module.exports = { createServer };
