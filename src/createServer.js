const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const {
  PORT,
  availableToCases,
  errorMessage,
} = require('./convertToCase/constans');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://localhost:${PORT}`);

    const requestText = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');
    const errors = [];

    if (!requestText) {
      errors.push({
        message: errorMessage.textRequired,
      });
    }

    if (!toCase) {
      errors.push({
        message: errorMessage.caseRequired,
      });
    } else if (!availableToCases.includes(toCase)) {
      errors.push({
        message: errorMessage.caseSupported,
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const convertedText = convertToCase(requestText, toCase);

      res.statusCode = 200;

      const respBody = {
        originalCase: convertedText.originalCase,
        targetCase: toCase,
        originalText: requestText,
        convertedText: convertedText.convertedText,
      };

      res.end(JSON.stringify(respBody));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });

  return server;
};

module.exports = { createServer };
