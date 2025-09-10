const http = require('http');
const convertToCase = require('./convertToCase').convertToCase;
const errorHandler = require('./convertToCase/errorHandler').errorHandler;

function createServer() {
  const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
      res.statusCode = 404;
      res.end('Not Found');

      return;
    }

    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const requestedPath = url.pathname?.slice(1);
    const toCase = url.searchParams.get('toCase');

    const errors = errorHandler(requestedPath, toCase);

    if (errors) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(requestedPath, toCase);

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        convertedText: result.convertedText,
        originalCase: result.originalCase,
        originalText: requestedPath,
        targetCase: toCase,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
