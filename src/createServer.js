const http = require('http');
const { procssingError } = require('./processingError');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);

    try {
      const originalText = url.pathname.slice(1);
      const targetCase = url.searchParams.get('toCase');

      procssingError(originalText, targetCase);

      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      res.statusCode = 200;

      res.end(
        JSON.stringify({
          originalCase,
          originalText,
          targetCase,
          convertedText,
        }),
      );
    } catch (err) {
      res.statusCode = 400;

      if (Array.isArray(err)) {
        res.end(
          JSON.stringify({
            errors: err.map((error) => ({ message: error.message })),
          }),
        );
      }
    }
  });
};

module.exports = { createServer };
