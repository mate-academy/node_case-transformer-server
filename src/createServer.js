const http = require('http');
const { validateParams } = require('./validate');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const normalizeURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizeURL.pathname.slice(1);
    const toCase = normalizeURL.searchParams.get('toCase');

    const errors = validateParams(textToConvert, toCase);

    if (errors.length) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });

    const {
      originalCase,
      convertedText,
    } = convertToCase(textToConvert, toCase);

    res.end(JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText,
    }));
  });
}

module.exports = { createServer };
