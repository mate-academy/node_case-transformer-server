const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { errorHandler } = require('./errorHandler');

function createServer() {
  const server = http.createServer(async (req, res) => {
    res.setHeader('Content-type', 'application/json');

    const normalizedURL = new URL(req.url, 'http://localhost:8080');

    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');

    try {
      if (!originalText) {
        throw new Error('Text should not be null');
      }

      const convertedText = await convertToCase(originalText, targetCase);

      res.end(
        JSON.stringify({
          originalCase: convertedText.originalCase,
          targetCase,
          originalText,
          convertedText: convertedText.convertedText,
        }),
      );
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          errors: errorHandler(originalText, targetCase),
        }),
      );
    }
  });

  return server;
}

module.exports = { createServer };
