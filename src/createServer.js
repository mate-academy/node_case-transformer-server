const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { request } = require('./request');
const { errorCatch } = require('./errorCatch');

function createServer() {
  const server = http.createServer((req, res) => {
    const { text, toCase } = request(req);

    const errors = errorCatch(text, toCase)

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));
    }

    const result = convertToCase(text, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    }));
  });

  return server;
}

module.exports = { createServer };
