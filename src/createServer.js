'use strict';

const http = require('http');
const { validate } = require('./convertToCase/validation.js');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [text, queryString] = req.url.slice(1).split('?');
    const queryParams = new URLSearchParams(queryString);
    const toCase = queryParams.get('toCase');

    if (validate(text, toCase).length) {
      return respondWithError(res, 400, validate(text, toCase));
    }

    const result = convertToCase(text, toCase);

    const response = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    respondWithJSON(res, 200, response);
  });

  return server;
}

function respondWithError(res, resStatus, errors) {
  const error = {
    errors,
  };

  respondWithJSON(res, resStatus, error);
}

function respondWithJSON(res, resStatus, data) {
  res.writeHead(resStatus, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

module.exports = { createServer };
