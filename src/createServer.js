const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validate } = require('./validate');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, 'http://localhost:5700');

    let textConvert = req.url.split('?')[0].slice(1);

    if (!normalizedURL.hostname) {
      textConvert = '';
    }

    const toCase = normalizedURL.searchParams.get('toCase');

    const resValidation = validate(textConvert, toCase);

    if (resValidation.errors.length !== 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(resValidation));
    }

    if (resValidation.errors.length === 0) {
      const { originalCase, convertedText }
        = convertToCase(textConvert, toCase);

      res.statusCode = 200;
      res.statusMessage = 'Ok';

      res.end(JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: textConvert,
        convertedText,
      }));
    }
  });
};

module.exports = { createServer };
