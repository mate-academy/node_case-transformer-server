const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validate } = require('./validate');

const createServer = () => {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = validate(originalText, targetCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(originalText, targetCase);

    const result = {
      targetCase,
      originalText,
      ...convertedText,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(result));
  });
};

module.exports = {
  createServer,
};
