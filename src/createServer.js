const http = require('http');

const { convertToCase } = require('./convertToCase');
const { parseURL } = require('./parseURL');
const { validateData } = require('./validateData');
const { serverResponse } = require('./serverResponse');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const { stringCase, queryString } = parseURL(req.url, req.headers.host);
    const validation = validateData(queryString, stringCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    if (validation.errors.length) {
      serverResponse(res, 400, validation);

      return;
    }

    const result = {
      ...convertToCase(queryString, stringCase),
      originalText: queryString,
      targetCase: stringCase,
    };

    res.end(JSON.stringify(result));
  });

  return server;
};

createServer();

module.exports = { createServer };
