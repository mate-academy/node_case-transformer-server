const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateRequest } = require('./validateRequest');

const createServer = () => {
  return http.createServer((req, res) => {
    const baseUrl = req.url.slice(1);

    const textToConvert = baseUrl.split('?')[0];
    const queryString = baseUrl.split('?')[1];
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = validateRequest(textToConvert, toCase);

    if (errors.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const response = JSON.stringify({
      ...convertToCase(textToConvert, toCase),
      originalText: textToConvert,
      targetCase: toCase,
    });

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(response);
  });
};

module.exports = { createServer };
