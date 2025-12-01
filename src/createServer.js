const http = require('http');
const { validate } = require('./validate');
const { convertToCase } = require('./convertToCase');

const createServer = () =>
  http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');
    const originalText = (path || '').slice(1);
    const params = new URLSearchParams(queryString || '');
    const targetCase = params.get('toCase');
    const errors = validate(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        convertedText,
        originalText,
      }),
    );
  });

module.exports = {
  createServer,
};
