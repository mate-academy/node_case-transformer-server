const http = require('http');
const { validateParams } = require('./validateParams');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [textToConvert, queryString] = req.url.slice(1).split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    try {
      validateParams(textToConvert, toCase);

      const { originalCase, convertedText } = convertToCase(
        textToConvert,
        toCase,
      );

      const response = {
        originalCase: originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: convertedText,
      };

      res.statusCode = 200;
      res.end(JSON.stringify(response));
    } catch (errors) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
