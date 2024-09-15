const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateRequest } = require('./validateRequest');

function createServer() {
  const server = http.createServer((req, res) => {
    const urlParams = new URL(`http://${req.headers.host}${req.url}`);
    const textToConvert = urlParams.pathname.replace('/', '');
    const caseName = urlParams.searchParams.get('toCase');

    const errors = validateRequest(textToConvert, caseName);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, caseName);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: caseName.toUpperCase(),
      convertedText: result.convertedText,
      originalText: textToConvert,
    }));
  });

  return server;
}

module.exports = { createServer };
