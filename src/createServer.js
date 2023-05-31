const http = require('http');
const { parseUrlQuery } = require('./parseUrlQuery');
const { errorCheck } = require('./errorCheck');
const { createResponse } = require('./createResponse');

function createServer() {
  const server = http.createServer((req, res) => {
    const urlQuery = req.url.split('?');

    const { text, toCase } = parseUrlQuery(urlQuery);

    const errorsMessages = errorCheck(text, toCase);
    const isError = errorsMessages.errors.length !== 0;

    res.setHeader('Content-Type', 'application/json');

    res.statusCode = isError ? 400 : 200;
    res.statusMessage = isError ? 'Bad request' : 'OK';

    res.end(isError
      ? JSON.stringify(errorsMessages)
      : createResponse(text, toCase));
  });

  return server;
};

module.exports = { createServer };
