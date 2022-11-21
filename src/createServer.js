const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { validate } = require('./convertToCase/validation');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const toCase = normalizedURL.searchParams.get('toCase');
    const textToConvert = normalizedURL.pathname.slice(1);


    let result = { errors: [] };
    const errorsMessages = validate(textToConvert, toCase);

    if (errorsMessages.length > 0) {
      result.errors = errorsMessages;
      res.statusCode = 400;
    } else {
      const {
        convertedText,
        originalCase,
      } = convertToCase(textToConvert, toCase);

      result = {
        convertedText,
        originalCase,
        originalText: textToConvert,
        targetCase: toCase,
      };
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  });

  return server;
};

module.exports = { createServer };
