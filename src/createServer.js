const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validation } = require('./validation');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizeURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizeURL.pathname.slice(1);
    const targetCase = normalizeURL.searchParams.get('toCase');
    const errors = validation(originalText, targetCase);

    if (errors.errors.length) {
      req.statusCode = 404;
      req.statusMessage = 'Bad request';
      res.end(JSON.stringify(errors));

      return;
    }

    const convertedText = convertToCase(originalText, targetCase);

    const requestData = JSON.stringify({
      ...convertedText,
      targetCase,
      originalText,
    });

    res.end(requestData);
  });

  return server;
};

module.exports = { createServer };
