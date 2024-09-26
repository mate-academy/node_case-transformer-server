const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { handleErrors } = require('./handleErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const toCase = normalizedURL.searchParams.get('toCase');
    const text = normalizedURL.pathname.slice(1);

    res.setHeader('Content-Type', 'application/json');

    const errors = handleErrors(text, toCase);

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const newCase = convertToCase(text, toCase);

    res.end(JSON.stringify(
      {
        ...newCase,
        targetCase: toCase,
        originalText: text,
      },
    ));
  });

  return server;
}

module.exports = { createServer };
