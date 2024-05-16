const http = require('http');

const { validateParams } = require('./validateParams');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [originalText, queryString] = req.url.slice(1).split('?');
    const targetCase = new URLSearchParams(queryString).get('toCase');

    try {
      validateParams(originalText, targetCase);

      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      const response = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
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
