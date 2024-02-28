const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validation } = require('./helpers/validation');

const createServer = () => http.createServer((req, res) => {
  const [pathname, queryString] = req.url.split('?');
  const params = new URLSearchParams(queryString);
  const targetCase = params.get('toCase');
  const originalText = pathname.slice(1);

  const errors = validation(originalText, targetCase);

  res.setHeader('Content-type', 'application/json');

  if (errors) {
    res.statusCode = 400;
    res.end(JSON.stringify({ errors }));

    return;
  }

  const {
    originalCase,
    convertedText,
  } = convertToCase(originalText, targetCase);

  res.statusCode = 200;

  res.end(JSON.stringify({
    originalCase,
    targetCase,
    originalText,
    convertedText,
  }));
});

module.exports = { createServer };
