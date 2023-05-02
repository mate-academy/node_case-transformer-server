const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { getOccuredErrors } = require('./getOccuredErrors');
const { getParamsFrom } = require('./getParamsFrom');

function createServer() {
  const server = http.createServer((req, res) => {
    const [originalText, targetCase] = getParamsFrom(req);
    const errors = getOccuredErrors(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      errors.forEach(error => (
        res.write(error)
      ));

      res.end();

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';

    const response = JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    });

    res.end(response);
  });

  return server;
}

module.exports = { createServer };
