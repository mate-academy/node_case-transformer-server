const http = require('node:http');
const { getContentToConvert } = require('./getContentToConvert');
const { convertToCase } = require('./convertToCase');
const { checkErrors } = require('./checkErrors');

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = getContentToConvert(req.url);
    const convertTo = normalizedURL.searchParams.get('toCase');

    const errors = checkErrors(convertTo, textToConvert);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, convertTo);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: convertTo,
      originalText: textToConvert,
      convertedText: result.convertedText,
    }));
  });
};

module.exports = { createServer };
