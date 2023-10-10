const { getErrors } = require('./returnError');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const http = require('http');
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, 'http://' + req.headers.host);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');
    const errors = getErrors(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

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
  });

  return server;
}

module.exports = { createServer };
