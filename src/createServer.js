const http = require('node:http');
const { convertToCase } = require('./convertToCase');
const { findErrors } = require('./findErrors.js');
const { detectCase } = require('./convertToCase/detectCase.js');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');
    const errors = findErrors(textToConvert, toCase);

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({ errors }));
    } else {
      const { convertedText } = convertToCase(textToConvert, toCase);

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify(
        {
          originalCase: detectCase(textToConvert),
          targetCase: toCase,
          originalText: textToConvert,
          convertedText,
        },
      ));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
