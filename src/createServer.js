const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer();

  server.on('request', (req, res) => {
    const urlParts = req.url.split('?');
    const originalText = urlParts[0].slice(1);

    const params = new URLSearchParams(urlParts[1]);
    const targetCase = params.get('toCase');

    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errorMessages = {
      emptyText: {
        message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      },
      emptyToCase: {
        message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      },
      invalidCase: {
        message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      },
    };
    const errors = [];

    if (!originalText) {
      errors.push(errorMessages.emptyText);
    }

    if (!targetCase) {
      errors.push(errorMessages.emptyToCase);
    } else if (!availableCases.includes(targetCase)) {
      errors.push(errorMessages.invalidCase);
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      res.statusCode = 200;
      res.statusText = 'OK';

      res.end(JSON.stringify({
        originalText,
        originalCase,
        convertedText,
        targetCase,
      }));
    }
  });

  return server;
};

module.exports = { createServer };
