const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkForErrors } = require('./checkForErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1) || '';
    const targetCase = normalizedUrl.searchParams.get('toCase') || '';
    const errors = checkForErrors(originalText, targetCase);

    if (errors.length) {
      const payload = { errors };

      res.statusCode = 400;
      res.end(JSON.stringify(payload));
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      const data = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.end(JSON.stringify(data));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
