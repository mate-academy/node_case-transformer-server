// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, 'http://localhost:3000');
    const textToTransform = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    const errors = [];

    // Валідація
    if (!textToTransform) {
      errors.push({
        message:
          'Text to convert is required.' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required.' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !SUPPORTED_CASES.includes(toCase.toUpperCase())) {
      errors.push({
        message:
          'This case is not supported.' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    // Відправка помилок, якщо вони є
    if (errors.length > 0) {
      res.writeHead(400, {
        'Content-Type': 'application/json',
        Status: 'Bad Request',
      });
      res.end(JSON.stringify({ errors }));

      return;
    }

    // Трансформація тексту
    const { originalCase, convertedText } = convertToCase(
      textToTransform,
      toCase,
    );

    // Успішна відповідь
    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        targetCase: toCase,
        originalText: textToTransform,
        originalCase,
        convertedText,
      }),
    );
  });

  return server;
}

createServer();

module.exports = {
  createServer,
};
