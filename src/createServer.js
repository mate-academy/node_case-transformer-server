const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { detectCase } = require('./convertToCase/detectCase');
const { validateRequest } = require('./convertToCase/validation');

function createServer() {
  const server = http.createServer((req, res) => {
    const urlParts = req.url.split('?');
    const textToConvert = urlParts[0].slice(1);
    const queryString = urlParts[1];
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];

    validateRequest(errors, textToConvert, toCase);

    if (errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: detectCase(textToConvert),
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
}

createServer();

module.exports = {
  createServer,
};
