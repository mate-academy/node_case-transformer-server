const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { urlValidation } = require('./urlValidation/urlValidation');

function createServer() {
  return http.createServer((req, res) => {
    const reqUrl = req.url;

    const { originalText, targetCase, errors } = urlValidation(reqUrl);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(...errors));
    }

    try {
      const convertedToCase = convertToCase(originalText, targetCase);

      convertedToCase.targetCase = targetCase;
      convertedToCase.originalText = originalText;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(convertedToCase));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  });
}

module.exports = { createServer };
