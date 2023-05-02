const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');
const { validateCaseErrors } = require('./convertToCase/validateCaseErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const requestedURL = new URL(req.url, `http://${req.headers.host}`);
    const text = requestedURL.pathname.slice(1);
    const toCase = requestedURL.searchParams.get('toCase');
    const errors = validateCaseErrors(text, toCase);

    res.setHeader('Content-Type', 'application/json');

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
