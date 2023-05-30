const http = require('http');
const { parseUrlQuery } = require('./parseUrlQuery');
const { errorCheck } = require('./errorCheck');
const { createResponse } = require('./createResponse');

function createServer() {
  const server = http.createServer((req, res) => {
    const urlQuery = req.url.split('?');

    const [text, toCase] = parseUrlQuery(urlQuery);

    const errors = errorCheck(text, toCase);
    const isError = errors.length !== 0;

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = isError ? 400 : 200;
    res.statusMessage = isError ? 'Bad request' : 'OK';

    if (isError) {
      res.end(JSON.stringify({
        errors: errors.map((error) => ({ message: error })),
      }));
    } else {
      res.end(JSON.stringify(createResponse(text, toCase)));
    }
  });

  return server;
};

module.exports = { createServer };
