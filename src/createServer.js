const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validator } = require('./validator');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const targetURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = targetURL.pathname.slice(1);
    const targetCase = targetURL.searchParams.get('toCase');
    const errors = validator(originalText, targetCase);
    const hasError = Boolean(errors.errors.length);

    if (hasError) {
      req.statusCode = 404;
      req.statusMessage = 'Bad request';
      res.end(JSON.stringify(errors));

			return;
    }

    const convertedText = convertToCase(originalText, targetCase);

    const requestData = JSON.stringify({
      ...convertedText,
      targetCase,
      originalText,
    });

    res.end(requestData);
  });

  return server;
};

module.exports = { createServer };
