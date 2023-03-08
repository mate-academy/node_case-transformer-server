const http = require('http');

const { convertToCase } = require('./convertToCase');
const { handleErrors } = require('./handleErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');

    const errors = handleErrors(originalText, targetCase);

    if (!errors.errors.length) {
      const convertedText = convertToCase(originalText, targetCase);

      const response = {
        originalText,
        targetCase,
        ...convertedText,
      };

      res.statusCode = 200;
      res.end(JSON.stringify(response));
    } else {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(errors));
    }
  });

  return server;
}

module.exports = { createServer };
