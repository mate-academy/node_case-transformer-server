const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkErrors } = require('./checkErrors');

const createServer = () => http.createServer((req, res) => {
  const url = new URL(`${req.host}${req.url}`);
  const originalText = url.pathname.slice(1);
  const targetCase = url.searchParams.get('toCase');

  res.setHeader('Content-Type', 'application/json');

  const errors = checkErrors(originalText, targetCase);

  if (errors.length > 0) {
    res.statusCode = 400;
    res.statusMessage = 'Bad request';
    res.end(JSON.stringify({ errors }));

    return;
  }

  const converted = convertToCase(originalText, targetCase);

  res.end(JSON.stringify({
    targetCase,
    originalText,
    ...converted,
  }));
});

module.exports = { createServer };
