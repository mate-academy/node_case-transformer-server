// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('../src/convertToCase/convertToCase');
const { validation } = require('./validation');
const createServer = () => {
  const server = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const originalText = pathname.slice(1);
    const targetCase = searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = validation(res, originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;

      res.end(JSON.stringify({
        errors,
      }));
    } else {
      const { originalCase, convertedText }
        = convertToCase(originalText, targetCase);

      res.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }));
    }
  });

  return server;
};

module.exports = { createServer };
