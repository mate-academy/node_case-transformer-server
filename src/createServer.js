const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { checkErrors } = require('./checkErrors.js');

function createServer() {
  const server = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = pathname.slice(1);
    const toCase = searchParams.get('toCase');
    const errors = checkErrors(textToConvert, toCase);

    if (errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    }));
  });

  return server;
}

module.exports = { createServer };
