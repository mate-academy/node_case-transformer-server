const http = require('http');
const { validate } = require('./validate');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');
    const errors = validate(originalText, targetCase);
    const response = {};

    if (errors.length > 0) {
      res.statusCode = 400;
      response.errors = errors;
    }

    if (errors.length === 0) {
      res.statusCode = 200;

      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      response.convertedText = convertedText;
      response.originalCase = originalCase;
      response.targetCase = targetCase;
      response.originalText = originalText;
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = { createServer };
