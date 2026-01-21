const http = require('http');
const { parseUrlQuery } = require('./parseUrlQuery');
const { errorCheck } = require('./errorCheck');
const { createResponse } = require('./createResponse');

function createServer() {
  const server = http.createServer(({ url }, response) => {
    const urlQuery = url.split('?');
    const { text, toCase } = parseUrlQuery(urlQuery);
    const errorMessages = errorCheck(text, toCase);
    const isError = errorMessages.errors.length !== 0;

    response.setHeader('Content-Type', 'application/json');
    response.statusCode = isError ? 400 : 200;
    response.statusMessage = isError ? 'Bad request' : 'OK';

    response.end(isError
      ? JSON.stringify(errorMessages)
      : createResponse(text, toCase));
  });

  return server;
};

module.exports = { createServer };
