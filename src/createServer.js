const { convertToCase } = require('./convertToCase');
const http = require('http');

function createServer() {
  const server = http.createServer((req, res) => {
    const urlParts = req.url.slice(1).split('?');
    const text = urlParts[0];
    const query = urlParts[1];
    const params = new URLSearchParams(query);
    const toCase = params.get('toCase');
    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is:' +
          ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is:' +
          ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases:' +
          ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const conversionResult = convertToCase(text, toCase);
    const response = {
      originalText: text,
      originalCase: conversionResult.originalCase,
      targetCase: toCase,
      convertedText: conversionResult.convertedText,
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = {
  createServer,
};
