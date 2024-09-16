const http = require('http');
const { convertToCase } = require('./convertToCase');
const validateRequest = require('./validateRequest');

function createServer() {
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const textToConvert = url.pathname.substring(1);
    const toCase = url.searchParams.get('toCase');

    const errors = validateRequest(textToConvert, toCase);

    if (errors.length > 0) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const { originalCase, convertedText } = convertToCase(
        textToConvert, toCase,
      );

      response.writeHead(200, { 'Content-Type': 'application/json' });

      response.end(JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      }));
    } catch (error) {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
