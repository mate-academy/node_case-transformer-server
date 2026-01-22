const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

function createServer() {
  const server = http.createServer((req, res) => {
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const urlParts = req.url.split('?');
    const params = new URLSearchParams(urlParts[1]);
    const textToConvert = urlParts[0].slice(1);
    const toCase = params.get('toCase');
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: 'Text to convert is required. Correct request is:'
          + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. Correct request is:'
        + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!supportedCases.includes(toCase) && toCase) {
      errors.push({
        message: 'This case is not supported. Available cases: '
        + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ errors }));
      res.end();

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    res.writeHeader(200, { 'Content-Type': 'application/json' });

    res.write(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    }));

    res.end();
  });

  return server;
}

module.exports = { createServer };
