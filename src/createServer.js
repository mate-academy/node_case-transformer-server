const http = require('http');
const { validation } = require('./validation');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const url = new URL(req.url, 'http://localhost:5700');
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const error = validation(originalText, targetCase);

    if (error) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify(error));
    }

    if (!error) {
      const { originalCase, convertedText }
        = convertToCase(originalText, targetCase);

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
