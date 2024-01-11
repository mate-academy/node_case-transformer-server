const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validation } = require('./convertToCase/hasError');

const PORT = process.argv.PORT || 3006;

const createServer = () => (
  http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, `http://localhost:${PORT}`);
    const path = url.pathname;
    const originalText = path.slice(1);
    const targetCase = url.searchParams.get('toCase');

    try {
      validation(originalText, targetCase);

      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      res.statusCode = 200;

      res.end(JSON.stringify({
        convertedText,
        originalCase,
        originalText,
        targetCase,
      }));

      return;
    } catch (errors) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));
    }
  })
);

module.exports = {
  createServer,
};
