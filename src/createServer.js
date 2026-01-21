const http = require('node:http');
const { convertToCase } = require('./convertToCase/index.js');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const fullUrl = `http://localhost${req.url}`;
    const parsedUrl = new URL(fullUrl);
    const textToConvert = parsedUrl.pathname.slice(1);
    const targetCase = parsedUrl.searchParams.get('toCase');

    const errors = [];
    const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (textToConvert === '') {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (targetCase === null) {
      errors.push({
        message:
          '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (targetCase !== null && !validCases.includes(targetCase)) {
      errors.push({
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
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

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = { createServer };
