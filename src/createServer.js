const http = require('http');
const { convertToCase } = require('./convertToCase');
const { findErrors } = require('./findErrors');
const { detectCase } = require('./convertToCase/detectCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const searchParams = new URLSearchParams(normalizedUrl.search);
    const toCase = searchParams.get('toCase');
    const errors = findErrors(textToConvert, toCase);

    if (errors.length > 0) {
      res
        .writeHead(400,
          'Bad request',
          { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ errors }));
    } else {
      const { convertedText } = convertToCase(textToConvert, toCase);
      const resObject = {
        originalCase: detectCase(textToConvert),
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      };

      res
        .writeHead(200,
          'OK',
          { 'Content-Type': 'application/json' })
        .end(JSON.stringify(resObject));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
