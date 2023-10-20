/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateRequest } = require('./requestValidation');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = parsedUrl.pathname.slice(1);
    const targetCase = parsedUrl.searchParams.get('toCase');

    const errors = validateRequest(originalText, targetCase);

    const response = {
      status: errors.length ? 400 : 200,
      statusText: errors.length ? 'Bad Request' : 'OK',
      headers: { 'Content-Type': 'application/json' },
      body: errors.length ? { errors } : {},
    };

    if (!errors.length) {
      const { convertedText, originalCase } = convertToCase(originalText, targetCase);

      response.body = {
        originalText,
        targetCase,
        convertedText,
        originalCase,
      };
    }

    res.writeHead(response.status, response.statusText, response.headers);
    res.end(JSON.stringify(response.body));
  });

  return server;
};

module.exports = { createServer };
