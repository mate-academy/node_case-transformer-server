const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateQueries } = require('./validateQueries');

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const textToConvert = url.pathname.slice(1);
    const caseName = url.searchParams.get('toCase');
    const errors = validateQueries(textToConvert, caseName);

    if (errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));
    } else {
      const data = convertToCase(textToConvert, caseName);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        ...data,
        originalText: textToConvert,
        targetCase: caseName,
      }));
    }
  });

  return server;
}

module.exports = { createServer };
