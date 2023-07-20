const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { getErrors } = require('./helper');

const createServer = () => (
  http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const originalText = req.url.split('?')[0].slice(1);
    const params = new URLSearchParams(req.url.split('?')[1]);
    const targetCase = params.get('toCase');

    const errors = getErrors(originalText, targetCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedData = convertToCase(originalText, targetCase);
    const { originalCase, convertedText } = convertedData;
    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(result));
  })
);

module.exports = { createServer };
