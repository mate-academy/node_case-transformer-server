const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validate } = require('./validation');

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    const errors = validate(textToConvert, toCase);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCase.toUpperCase());

    res.setHeader('Content-Type', 'application/json');

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase.toUpperCase(),
        originalText: textToConvert,
        convertedText: result.convertedText,
      }),
    );
  });
};

module.exports = { createServer };
