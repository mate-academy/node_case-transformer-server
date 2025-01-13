const { convertToCase } = require('./convertToCase');
const { validate } = require('./validate');
const http = require('http');

function createServer() {
  return http.createServer((req, res) => {
    const urlParts = req.url.split('?');
    const queryParams = new URLSearchParams(urlParts[1]);
    const textToConvert = urlParts[0].replace('/', '');
    const toCase = queryParams.get('toCase');

    const validationErrors = validate(textToConvert, toCase);

    if (validationErrors.length > 0) {
      res.writeHead(400, {
        'Content-Type': 'application/json',
        Status: 'Bad Request',
      });
      res.end(JSON.stringify({ errors: validationErrors }));

      return;
    }

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

    res.writeHead(200, { 'Content-Type': 'application/json', Status: 'OK' });
    res.end(JSON.stringify(response));
  });
}

module.exports = { createServer };
