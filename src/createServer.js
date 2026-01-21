const http = require('http');
const { convertToCase } = require('./convertToCase');
const validateRequest = require('./validateRequest');

function createServer() {
  return http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = parsedUrl.pathname.slice(1);
    const toCase = parsedUrl.searchParams.get('toCase');

    const errors = validateRequest(textToConvert, toCase);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      toCase,
    );

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: convertedText,
      }),
    );
  });
}

module.exports = { createServer };
