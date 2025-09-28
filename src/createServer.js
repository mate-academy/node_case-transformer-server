const http = require('node:http');
const { convertToCase } = require('./convertToCase/index.js');

const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');
    const textToConvert = (path || '').slice(1);
    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');

    const errors = [];

    if (textToConvert === '') {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (targetCase && !validCases.includes(targetCase)) {
      errors.push({
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, targetCase);

    const response = {
      originalCase: result.originalCase,
      targetCase: targetCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    };

    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = { createServer };
