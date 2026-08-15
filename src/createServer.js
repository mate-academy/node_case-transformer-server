/* eslint-disable no-console */

const http = require('node:http');
const { parseRequest } = require('./parseRequest');
const { checkRequest } = require('./checkRequest');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const { text, toCase } = parseRequest(req);
    const errorMessages = checkRequest(text, toCase);

    if (errorMessages.length > 0) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify({ errors: errorMessages }));
    }

    const result = convertToCase(text, toCase);

    const response = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = {
  createServer,
};
