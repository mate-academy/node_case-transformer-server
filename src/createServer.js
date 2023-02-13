const http = require('http');
const { convertToCase } = require('./convertToCase/index');
const { errorHandler } = require('./errorHandler');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `https://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const errors = errorHandler(originalText, targetCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const resultFromConvert = convertToCase(originalText, targetCase);

    const result = {
      originalCase: resultFromConvert.originalCase,
      targetCase,
      convertedText: resultFromConvert.convertedText,
      originalText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = {
  createServer,
};
