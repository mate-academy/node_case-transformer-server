const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateRequest } = require('./utils/validateRequest');
const { parseRequest } = require('./utils/parseRequest');

function createServer() {
  const server = http.createServer((req, res) => {
    const { text, toCase } = parseRequest(req);
    const errors = validateRequest(text, toCase);

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(text, toCase);
    const response = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = { createServer };
