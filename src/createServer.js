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

    if (isError) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(errorsMessages));
    } else {
      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end((createResponse(text, toCase)));
    }
  });

  return server;
};

module.exports = { createServer };
