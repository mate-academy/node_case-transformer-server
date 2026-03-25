const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [path, queryString] = req.url.split('?');
    const originalText = path.slice(1);
    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');

    const errors = [];
    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!originalText) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!availableCases.includes(targetCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases:' +
          ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request');

      return res.end(JSON.stringify({ errors }));
    }

    const result = convertToCase(originalText, targetCase);

    const responsePayload = {
      originalCase: result.originalCase,
      targetCase: targetCase,
      originalText: originalText,
      convertedText: result.convertedText,
    };

    res.writeHead(200, 'OK');
    res.end(JSON.stringify(responsePayload));
  });

  return server;
}

module.exports = { createServer };
