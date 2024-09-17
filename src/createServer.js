const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { errorValidator } = require('./errorValidator');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normUrl.pathname.slice(1);
    const targetCase = normUrl.searchParams.get('toCase');

    const errors = errorValidator(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
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

module.exports = { createServer };
