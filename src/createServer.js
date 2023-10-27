const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validation } = require('./validation');

function createServer(requestHandler) {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedURL.pathname.slice(1);
    const caseName = normalizedURL.searchParams.get('toCase');

    const errors = validation(text, caseName);

    if (errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({ errors }));

      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });

    const { originalCase, convertedText } = convertToCase(text, caseName);

    res.end(JSON.stringify({
      originalCase,
      targetCase: caseName,
      convertedText,
      originalText: text,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
