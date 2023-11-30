const http = require('http');
const { convertToCase } = require('./convertToCase');
const { detectCase } = require('./convertToCase/detectCase');
const { validateResponse } = require('./validateResponse.js');

function createServer() {
  const server = http.createServer((req, res) => {
    const [urlPart, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const oldCase = detectCase(urlPart.slice(1));

    const errorMessages = validateResponse(urlPart.slice(1), toCase);

    if (errorMessages.errors.length) {
      res.statusMessage = 'Incorrect request';
      res.writeHead(200, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify(errorMessages));
    }

    const result = convertToCase(urlPart.slice(1), toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: oldCase,
        targetCase: toCase,
        originalText: urlPart.slice(1),
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
