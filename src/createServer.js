const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { handleErrors } = require('./handleErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const myURL = new URL(req.url, `http://${req.headers.host}`);

    res.setHeader('Content-Type', 'application/json');

    const originalText = myURL.pathname.slice(1);
    const targetCase = myURL.searchParams.get('toCase');

    const errors = handleErrors(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    };

    const { originalCase, convertedText }
    = convertToCase(originalText, targetCase);

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = { createServer };
