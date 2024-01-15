const http = require('http');
const { convertToCase } = require('./convertToCase');
const { wordsToCase } = require('./convertToCase/wordsToCase');
const { errorHandler } = require('./ErrorHandler');

const BAD_REQUEST = 'Bad request';

const PORT = process.env.PORT || 5700;

function createServer() {
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

    const errorsObj = errorHandler(originalText, targetCase);

    if (errorsObj.errors.length) {
      res.statusCode = 400;
      res.statusMessage = BAD_REQUEST;
      res.end(JSON.stringify(errorsObj));
    } else {
      const { originalCase, convertedText } = convertToCase(originalText, targetCase);

      const result = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      console.log(result);
      res.end(JSON.stringify(result));
    }

  });

  return server;
}

module.exports = {
  createServer
}
