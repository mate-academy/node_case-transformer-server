const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validate } = require('./validate');

const createServer = () => http.createServer((req, res) => {
  const requestURL = new URL(req.url, `http://${req.headers.host}`);
  const originalText = requestURL.pathname.slice(1);
  const targetCase = requestURL.searchParams.get('toCase');

  res.setHeader('Content-Type', 'application/json');

  const errors = validate(originalText, targetCase);

  if (errors.length) {
    res.statusCode = 400;
    res.end(JSON.stringify(errors));

    return;
  }

  const responseData = JSON.stringify({
    ...convertToCase(originalText, targetCase),
    targetCase,
    originalText,
  });

  res.end(responseData);
});

module.exports = { createServer };
