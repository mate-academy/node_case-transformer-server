const http = require('http');
const { validateArgs } = require('./validateArgs');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');
    const errors = validateArgs(originalText, targetCase);

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });

      return res.end(
        JSON.stringify({
          errors,
        }),
      );
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const response = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  });
}

module.exports = { createServer };
