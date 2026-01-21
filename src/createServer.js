const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateRequest } = require('./validateRequest');

function createServer() {
  const server = http.createServer((req, res) => {
    const normolizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const targetCase = normolizedUrl.searchParams.get('toCase');
    const originalText = normolizedUrl.pathname.slice(1);

    const errors = validateRequest(targetCase, originalText);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
