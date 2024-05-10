const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateData } = require('./utils/validateData');

function createServer() {
  const server = http.createServer((req, res) => {
    try {
      const [originalText, queryString] = req.url.slice(1).split('?');
      const targetCase = new URLSearchParams(queryString).get('toCase');

      validateData(originalText, targetCase);

      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      const result = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (errors) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
}

module.exports = { createServer };
