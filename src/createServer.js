const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const createServer = () => {
  const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
      res.writeHead(204, { 'Content-Type': 'image/x-icon' });
      res.end();

      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';

    const errors = [];
    const VALID_TARGET_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    if (!originalText) {
      errors.push({
        message:
          'Text to convert is required. Correct request' +
          'is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request' +
          'is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!VALID_TARGET_CASES.includes(targetCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases:' +
          ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const transformText = convertToCase(originalText, targetCase);

    res.end(
      JSON.stringify({
        originalCase: transformText.originalCase,
        targetCase: targetCase,
        originalText: originalText,
        convertedText: transformText.convertedText,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
