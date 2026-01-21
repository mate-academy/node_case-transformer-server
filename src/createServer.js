const http = require('http');

const { getErrors } = require('./getErrors');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    res.setHeader('Content-Type', 'application/json');

    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const errors = getErrors(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = { createServer };
