const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkTextAndCase } = require('./checkingErrors');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');
    const errors = checkTextAndCase(originalText, targetCase);

    if (errors.length) {
      req.statusCode = 400;
      req.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    } else {
      req.statusCode = 200;
      req.statusMessage = 'Ok';

      const convertedText = convertToCase(originalText, targetCase);

      res.end(JSON.stringify({
        ...convertedText,
        targetCase,
        originalText,
      }));
    }
  });

  return server;
};

module.exports = { createServer };
