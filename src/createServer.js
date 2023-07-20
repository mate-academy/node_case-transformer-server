const http = require('http');
const { convertToCase } = require('./convertToCase');
const { handleErrors } = require('./handleErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedURL.pathname.slice(1);
    const caseName = normalizedURL.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = handleErrors(textToConvert, caseName);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert, caseName,
    );

    const result = {
      originalCase,
      targetCase: caseName,
      originalText: textToConvert,
      convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = { createServer };
