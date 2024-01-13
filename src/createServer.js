const http = require('http');
const { convertToCase } = require('./convertToCase');
const { parseUrl } = require('./parseUrl');
const { validateUrl } = require('./validateUrl');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    try {
      const { textToConvert, toCase } = parseUrl(req.url);

      validateUrl(textToConvert, toCase);

      const result = convertToCase(textToConvert, toCase);

      res.statusCode = 200;

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: toCase,
          originalText: textToConvert,
          convertedText: result.convertedText,
        }),
      );
    } catch (errors) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
};

module.exports = { createServer };
