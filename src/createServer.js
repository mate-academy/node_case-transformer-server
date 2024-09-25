const http = require('http');
const { validation } = require('./validation');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizeURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizeURL.pathname.slice(1);
    const targetCase = normalizeURL.searchParams.get('toCase');
    const errors = validation(originalText, targetCase);

    if (errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    const {
      originalCase, convertedText,
    } = convertToCase(originalText, targetCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
      originalCase,
      convertedText,
      targetCase,
      originalText,
    }));
  });

  return server;
};

module.exports = { createServer };
