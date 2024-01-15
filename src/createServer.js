const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { validation } = require('./validation.js');

const PORT = process.env.PORT || 4000;

const createServer = () => {
  const server = http.createServer((req, res) => {
    try {
      const newUrl = new URL(req.url, `http://localhost:${PORT}`);
      const originalText = newUrl.pathname.slice(1);
      const targetCase = newUrl.searchParams.get('toCase');

      res.setHeader('Content-Type', 'application/json');

      validation(originalText, targetCase);
      res.statusCode = 200;

      const { originalCase, convertedText } = convertToCase(
        originalText, targetCase,
      );

      res.write(JSON.stringify({
        originalText,
        originalCase,
        targetCase,
        convertedText,
      }));

      res.end();
    } catch (errors) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors,
      }));

      res.end();
    }
  });

  return server;
};

module.exports = {
  createServer,
};
