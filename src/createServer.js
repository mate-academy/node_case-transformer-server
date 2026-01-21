const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkingErrors } = require('./checkingErrors');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');
    const errors = checkingErrors(textToConvert, targetCase);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    if (req.method === 'GET') {
      if (errors) {
        res.writeHead(400, 'Bad request', {
          'Content-Type': 'application/json',
        });

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
    }
  });
};

module.exports = {
  createServer,
};
