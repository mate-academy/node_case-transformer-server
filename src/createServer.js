/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkParams } = require('./checkParams');
const { normalizeUrl } = require('./normalizeUrl');

function createServer() {
  return http.createServer((req, res) => {
    const { toCase, textToConvert } = normalizeUrl(req.url, req.headers.host);
    const validation = checkParams(textToConvert, toCase);

    if (validation.errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify(validation));
    }

    const { originalCase, convertedText } = convertToCase(textToConvert, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    return res.end(JSON.stringify({
      originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText,
    }));
  });
}

module.exports = { createServer };
