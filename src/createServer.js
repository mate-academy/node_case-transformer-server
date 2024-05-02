const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const getErrors = require('./utils/getErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    let errors = [];

    try {
      res.setHeader('Content-Type', 'application/json');

      const splittedUrl = req.url.split('?');
      const originalText = splittedUrl[0].slice(1);
      const targetCase = new URLSearchParams(splittedUrl[1]).get('toCase');

      errors = getErrors(originalText, targetCase);

      if (errors.length) {
        throw new Error();
      }

      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      const result = JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      });

      res.statusCode = 200;
      res.end(result);
    } catch {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
}

module.exports = { createServer };
