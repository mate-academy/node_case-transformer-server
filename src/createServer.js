// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateRequest } = require('./validateRequest');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const textToConvert = url.pathname.slice(1);
    const toCase = url.searchParams.get('toCase');
    const errors = validateRequest(textToConvert, toCase);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors: errors }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });

      const { originalCase, convertedText } = convertToCase(
        textToConvert,
        toCase,
      );

      res.end(
        JSON.stringify({
          originalCase: originalCase,
          targetCase: toCase,
          originalText: textToConvert,
          convertedText: convertedText,
        }),
      );
    }
  });

  return server;
};

module.exports.createServer = createServer;
