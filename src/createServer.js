// /<TEXT_TO_CONVERT>?toCase=<CASE_NAME>.
const { convertToCase } = require('./convertToCase/convertToCase.js');
const { validation } = require('./validation.js');
const { getError } = require('./getError.js');

const http = require('http');

const createServer = () => {
  return http.createServer((req, res) => {
    if (!req.url) {
      return;
    }

    const resultOfValidation = validation(req.url);

    if (Array.isArray(resultOfValidation)) {
      const errors = getError(resultOfValidation);

      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({ errors }));

      return;
    }

    const { text: originalText, target: targetCase } = resultOfValidation;

    const conversionResult = convertToCase(originalText, targetCase);

    if (conversionResult) {
      const { originalCase, convertedText } = conversionResult;

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          originalCase,
          targetCase,
          originalText,
          convertedText,
        }),
      );
    }
  });
};

module.exports = {
  createServer,
};
