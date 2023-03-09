const http = require('http');
const { convertToCase } = require('./convertToCase');
const { findError } = require('./findError');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const originalText = normalizedURL.pathname.slice(1);

    const errors = findError(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 404;
      res.statusMessage = 'Request not valid';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedToCase = convertToCase(originalText, targetCase);

    const requestData = JSON.stringify({
      ...convertedToCase,
      originalText,
      targetCase,
    });

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(requestData);
  });

  return server;
};

module.exports = { createServer };
