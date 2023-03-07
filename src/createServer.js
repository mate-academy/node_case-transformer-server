const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validator } = require('./validator');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textParams = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');
    const errors = validator(textParams, toCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = {
      ...convertToCase(textParams, toCase),
      originalText: textParams,
      targetCase: toCase,
    };

    res.statusMessage = 'OK';
    res.end(JSON.stringify(result));
  });

  return server;
};

module.exports = { createServer };
