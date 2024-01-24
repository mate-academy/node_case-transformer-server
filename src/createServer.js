// createServer.js
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validRequest } = require('./validRequest');

const PORT = process.env.PORT || 5700;

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/favicon.ico') {
      res.writeHead(204, { 'Content-Type': 'image/x-icon' });
      res.end();

      return;
    }

    const normalizedURL = new URL(req.url.slice(1), `http://localhost:${PORT}`);

    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');

    const errorsObj = validRequest(originalText, targetCase);

    if (errorsObj.errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify(errorsObj));
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
