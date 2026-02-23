const http = require('http');
const { urlValidation } = require('./urlValidation');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const toCase = url.searchParams.get('toCase');
    const errorBody = urlValidation(originalText, toCase);

    res.setHeader('Content-Type', 'application/json');

    if (errorBody.errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify(errorBody));

      return;
    }

    res.statusCode = 200;

    const body = convertToCase(originalText, toCase);

    body['targetCase'] = toCase;
    body['originalText'] = originalText;

    res.end(JSON.stringify(body));
  });
};

module.exports = { createServer };
