const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateRequest } = require('./utils/validateRequest');
const { STATUS_CODE } = require('./constants/constants');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [originalText, splitedURL] = req.url.slice(1).split('?');
    const targetCase = new URLSearchParams(splitedURL).get('toCase');

    const errors = validateRequest(originalText, targetCase);

    if (errors.length > 0) {
      res.statusCode = STATUS_CODE.bad_request;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = STATUS_CODE.ok;
    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = { createServer };
