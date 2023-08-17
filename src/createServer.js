const http = require('http');
const { convertToCase } = require('./convertToCase');

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const textToConvert = path.slice(1);

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!cases.includes(toCase.toUpperCase())) {
      errors.push({
        message: 'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));
    } else {
      const result = convertToCase(textToConvert, toCase);

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      }));
    }
  });

  return server;
}

module.exports = { createServer };
