const http = require('http');
const { convertToCase } = require('./convertToCase');
const { PORT, SUPPORTEDCASES, ERRORMESSAGE } = require('./constants');

function createServer() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    const normUrl = new URL(req.url, `http://localhost:${PORT}`);
    const text = normUrl.pathname.slice(1);
    const targetCase = normUrl.searchParams.get('toCase');
    const errors = [];

    try {
      if (!text) {
        errors.push({
          message: ERRORMESSAGE.textRequired,
        });
      }

      if (!targetCase) {
        errors.push({
          message: ERRORMESSAGE.caseRequired,
        });
      }

      if (!SUPPORTEDCASES.includes(targetCase.toUpperCase())) {
        errors.push({
          message: ERRORMESSAGE.caseSupported,
        });
      }

      if (errors.length) {
        throw new Error(errors.join(', '));
      }

      const { originalCase, convertedText } = convertToCase(text, targetCase);
      const response = {
        originalCase: originalCase,
        targetCase: targetCase,
        originalText: text,
        convertedText: convertedText,
      };

      res.end(JSON.stringify(response));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
}

module.exports = { createServer };
