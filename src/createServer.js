const http = require('http');
const { validation } = require('./validation');
const { convertToCase } = require('./convertToCase');

const PORT = 8080;
const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const url = new URL(req.url, `http:localhost:${PORT}`);
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
};

module.exports = {
  createServer,
};
