// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { isConvertError } = require('./isConvertError');


const createServer = () => {

    const server = http.createServer((req, res) => {
      res.setHeader("Content-Type", "application/json");

      const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
      const originalText = normalizedURL.pathname.slice(1);
      const targetCase = normalizedURL.searchParams.get('toCase');
      const errors = isConvertError(originalText, targetCase);


      if (errors.length > 0) {
        res.statusCode = 404;
        res.statusMessage = 'Bad request';
        res.end(JSON.stringify({
          errors,
        }))

        return;
      }
      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify({
        ...convertToCase(originalText, targetCase),
        targetCase,
        originalText,
      }));
    })

    return server;
};

createServer()

module.exports = { createServer }
