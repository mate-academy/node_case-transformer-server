const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateParams } = require('./validateParams');
const { getParams } = require('./getParams');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const { textToConvert, toCase } = getParams(req.url);
    const errors = validateParams(textToConvert, toCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusText = 'Request not supported';

      const errorResponse = {
        errors,
      };

      res.end(JSON.stringify(errorResponse));

      return;
    };

    const converted = convertToCase(textToConvert, toCase);

    const convertedResponse = {
      originalCase: converted.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: converted.convertedText,
    };

    res.end(JSON.stringify(convertedResponse));
  });

  return server;
}

module.exports = { createServer };
