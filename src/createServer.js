const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');
const { errorMessages } = require('./errorMessages');
const { cases } = require('./cases');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = req.url.split('?')[0].slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: errorMessages.textIsMissing,
      });
    }

    if (!toCase) {
      errors.push({
        message: errorMessages.toCaseIsMissing,
      });
    } else if (!cases.includes(toCase)) {
      errors.push({
        message: errorMessages.caseIsNotSupported,
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));
    } else {
      const result = convertToCase(textToConvert, toCase);

      res.statusCode = 200;

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: toCase,
          originalText: textToConvert,
          convertedText: result.convertedText,
        }),
      );
    }
  });

  return server;
};

module.exports = { createServer };
