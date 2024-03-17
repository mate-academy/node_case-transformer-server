const http = require('http');
const checkErrors = require('./utils/checkErrors');
const parseParams = require('./utils/parseParams');
const composeResponse = require('./utils/composeResponse');

function createServer() {
  const server = http.createServer((req, res) => {
    let errors = [];

    res.setHeader('Content-Type', 'application/json');

    try {
      const { originalText, targetCase } = parseParams(req);

      errors = checkErrors(originalText, targetCase);

      if (errors.length) {
        throw new Error();
      }

      const result = composeResponse(originalText, targetCase);

      res.statusCode = 200;
      res.end(result);
    } catch (error) {
      const errorMessage = JSON.stringify({ errors });

      res.statusCode = 400;
      res.end(errorMessage);
    }
  });

  return server;
}

module.exports = { createServer };
