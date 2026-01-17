/* eslint-disable quote-props */
/* eslint-disable max-len */
const { convertToCase } = require('./convertToCase');
const { validateError } = require('./validateError');

const createServer = () => {
  const http = require('http');
  const PORT = process.env.PORT || 3000;
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, `http://localhost:${PORT}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');
    const validateErrorMessage = validateError(originalText, targetCase);

    if (validateErrorMessage.errors.length === 0) {
      const convertedCase = convertToCase(originalText, targetCase);
      const convertedText = convertedCase.convertedText;
      const result = {
        originalCase: convertedCase.originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'Ok';
      res.end(JSON.stringify(result));
    }

    if (validateErrorMessage.errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(validateErrorMessage));
    }
  });

  return server;
};

module.exports = { createServer };
