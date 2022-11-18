const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validate } = require('./convertToCase/validate');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const response = {};
    const text = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');
    const errors = validate(text, toCase);

    if (errors.length > 0) {
      response.errors = errors;

      res.statusCode = 400;
      res.statusMessage = 'Bad request';
    } else {
      res.statusCode = 200;

      const { originalCase, convertedText } = convertToCase(text, toCase);

      response.originalCase = originalCase;
      response.targetCase = toCase;
      response.originalText = text;
      response.convertedText = convertedText;
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = { createServer };
