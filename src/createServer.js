const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const validateTextAndCase = require('./validateTextAndCase');

module.exports.createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedURL.pathname.replace('/', '');
    const caseName = normalizedURL.searchParams.get('toCase');

    res.setHeader('Content-type', 'application/json');

    const errors = validateTextAndCase(text, caseName);

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const converted = convertToCase(text, caseName);
    const response = JSON.stringify({
      originalCase: converted.originalCase,
      targetCase: caseName,
      originalText: text,
      convertedText: converted.convertedText,
    });

    res.statusCode = 200;
    res.end(response);
  });

  return server;
};
