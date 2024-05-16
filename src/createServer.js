/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const validateRequest = require('./services/validateRequest');

const STATUS_CODE = {
  OK: 200,
  ERROR: 400,
};

function createServer() {
  const server = http.createServer((req, res) => {
    const urlParts = req.url.slice(1).split('?');
    const originalText = urlParts[0];
    const targetCase = new URLSearchParams(urlParts[1]).get('toCase');

    res.setHeader('Content-Type', 'application/json');

    try {
      validateRequest(targetCase, originalText);

      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      res.statusCode = STATUS_CODE.OK;

      res.end(
        JSON.stringify({
          originalCase,
          targetCase,
          originalText,
          convertedText,
        }),
      );
    } catch (errors) {
      res.statusCode = STATUS_CODE.ERROR;
      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
}

module.exports = { createServer };
