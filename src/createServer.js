const http = require('http');
const { convertToCase } = require('./convertToCase');
const { checkValidation } = require('./checkValidation');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const originalText = normalizedURL.pathname.slice(1);
    const errors = checkValidation(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      convertedText,
      originalCase,
    } = convertToCase(originalText, targetCase);

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,

    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(result));
  });

  return server;
};

module.exports = { createServer };
