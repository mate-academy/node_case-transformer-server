const http = require('http');
const { validateRequest } = require('./validateRequest');
const { convertToCase } = require('./convertToCase/convertToCase');
const { detectCase } = require('./convertToCase/detectCase');
const { getRequestData } = require('./convertToCase/getRequestData');

function createServer(PORT) {
  const server = http.createServer((req, res) => {
    const { targetCase, originalText } = getRequestData(req.url);
    const errors = validateRequest(originalText, targetCase);

    if (errors.length > 0) {
      res.statusCode = 400;

      res.setHeader('Content-Type', 'application/json');

      return res.end(JSON.stringify({ errors }));
    }

    const { convertedText } = convertToCase(originalText, targetCase);
    const originalCase = detectCase(originalText);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: originalCase,
        targetCase: targetCase,
        originalText: originalText,
        convertedText: convertedText,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
