const http = require('node:http');

const { convertToCase } = require('./convertToCase/convertToCase');
const { validateParams } = require('./validation');
const { STATUS_CODES } = require('./utils/constants');

function createServer() {
  const server = http.createServer((req, res) => {
    const [text, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase') || '';
    const textToConvert = text.slice(1);

    const errors = validateParams(textToConvert, toCase);

    if (errors.length > 0) {
      const data = JSON.stringify({ errors });

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = STATUS_CODES.BAD_REQUEST.status_code;
      res.statusMessage = STATUS_CODES.BAD_REQUEST.status_text;
      res.end(data);

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    result.targetCase = toCase;
    result.originalText = textToConvert;

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = STATUS_CODES.OK.status_code;
    res.statusMessage = STATUS_CODES.OK.status_text;

    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = {
  createServer,
};
