const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validator } = require('./validator.js');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const errors = validator(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));

      return;
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      ...convertToCase(originalText, targetCase),
      targetCase,
      originalText,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
