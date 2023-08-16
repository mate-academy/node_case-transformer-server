const http = require('http');
const converter = require('./convertToCase/convertToCase.js');
const urlValidator = require('./getAndValidateUrl');

const createServer = function() {
  return http.createServer((req, res) => {
    try {
      const { textToConvert, toCase }
        = urlValidator.getAndValidateUrl(req.url, req.headers.host);

      const result = converter.convertToCase(textToConvert, toCase);

      res.statusCode = 200;

      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      }));
    } catch (err) {
      req.statusCode = 400;

      res.setHeader('Content-Type', 'application/json');

      res.end(err.message);
    }
  });
};

module.exports = {
  createServer,
};
