const http = require('http');
const { convertToCase } = require('./convertToCase');
const { checkUrlParams } = require('./checkUrlParams');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const urlParams = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = urlParams.pathname.slice(1);
    const toCase = urlParams.searchParams.get('toCase');

    const errors = checkUrlParams(textToConvert, toCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    } else {
      const result = convertToCase(textToConvert, toCase);
      const responsePayload = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(responsePayload));
    }
  });

  return server;
}

createServer();

module.exports = { createServer };
