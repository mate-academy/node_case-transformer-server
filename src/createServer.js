const http = require('node:http');

const { convertToCase } = require('./convertToCase');
const { validation } = require('./validation');

function createServer() {
  return http.createServer((req, res) => {
    const currURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = currURL.pathname.slice(1);
    const toCase = currURL.searchParams.get('toCase');

    const errors = validation(textToConvert, toCase);

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
