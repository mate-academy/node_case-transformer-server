/* eslint-disable no-console */
'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateRequest } = require('./validateRequest');
const PORT = process.env.PORT || 3000;

function createServer() {
  const server = http.createServer((req, res) => {
    const urlParts = req.url.split('?');
    const originalText = urlParts[0].substring(1);
    const queryString = urlParts[1];
    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');
    const isRequestInvalid = validateRequest(originalText, targetCase);

    if (isRequestInvalid) {
      const errorResponse = {
        errors: isRequestInvalid,
      };

      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(errorResponse));
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);
      const serverResponse = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(serverResponse));
    }
  });

  server.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });

  server.close();

  return server;
};

createServer();

module.exports = { createServer };
