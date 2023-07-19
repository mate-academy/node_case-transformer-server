const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateParams } = require('./validateParams');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const errors = validateParams(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const result = {
      originalCase,
      targetCase,
      convertedText,
      originalText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify(result));
  });
};

module.exports = {
  createServer,
};
