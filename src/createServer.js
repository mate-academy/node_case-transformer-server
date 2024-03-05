// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { checkErrors } = require('./checkErrors');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');
    const errors = checkErrors(textToConvert, targetCase);

    if (errors) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          errors,
        }),
      );
    } else {
      const { originalCase, convertedText } = convertToCase(
        textToConvert,
        targetCase,
      );

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          originalCase,
          targetCase,
          originalText: textToConvert,
          convertedText,
        }),
      );
    }
  });
}

module.exports = {
  createServer,
};
