const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getErrors } = require('./utils/getErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const [originalText, queryString] = req.url.slice(1).split('?');
    const targetCase = new URLSearchParams(queryString).get('toCase');

    const errors = getErrors(originalText, targetCase);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

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
  });

  return server;
}

module.exports = { createServer };
