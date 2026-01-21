const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getValidationInfo } = require('./urlValidation');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { errors, originalText, targetCase } = getValidationInfo(req.url);

    if (errors.length) {
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

      const resBody = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.end(JSON.stringify(resBody));
    }
  });

  return server;
}

module.exports = { createServer };
