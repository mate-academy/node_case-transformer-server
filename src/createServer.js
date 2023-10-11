const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { detectCase } = require('./convertToCase/detectCase');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const urlParts = req.url.split('?');
    const textToConvert = urlParts[0].slice(1);
    const queryString = urlParts[1];
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: 'Text to convert is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !supportedCases.includes(toCase)) {
      errors.push({
        message: 'This case is not supported.'
          + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (!errors.length) {
      const result = convertToCase(textToConvert, toCase);

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({
        originalCase: detectCase(textToConvert),
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      }));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
}

createServer();

module.exports = {
  createServer,
};
