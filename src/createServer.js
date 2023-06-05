const http = require('http');
const { convertToCase } = require('./convertToCase');
const { request } = require('./request');
const { errorCatch } = require('./errorCatch');
const { sendRequest } = require('./sendRequest');

function createServer() {
  const server = http.createServer((req, res) => {
    const { text, toCase } = request(req);

    const errors = errorCatch(text, toCase);

    if (errors.length > 0) {
      return sendRequest(400, { 'Content-Type': 'application/json' }, errors);
    }

    const result = convertToCase(text, toCase);

    sendRequest(200, { 'Content-Type': 'application/json' },
      {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      });
  });

  return server;
}

module.exports = { createServer };
