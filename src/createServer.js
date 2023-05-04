const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { catchErrors } = require('./catchErrors.js');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const text = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    const errors = catchErrors(text, toCase);

    if (errors.length !== 0) {
      res.statusCode = 400;

      return res.end(JSON.stringify({ errors }));
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
