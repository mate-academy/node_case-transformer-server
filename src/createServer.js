const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getParams } = require('./getParams');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { errors, targetCase, originalText } = getParams(req.url);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    } else {
      res.statusCode = 200;
      res.statusMessage = 'OK';

      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);
      const response = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.end(JSON.stringify(response));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
