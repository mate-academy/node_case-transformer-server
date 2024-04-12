const http = require('http');
const { convertToCase } = require('./convertToCase');
const { handleErrors } = require('./errorHandler');

const createServer = () =>
  http.createServer((req, res) => {
    const [path, query] = req.url.split('?');
    const originalText = path.slice(1);
    const targetCase = new URLSearchParams(query).get('toCase');

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const errors = handleErrors(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }),
    );
  });

module.exports = { createServer };
