// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function validateURL(url) {
  const originalText = url.pathname.slice(1);
  const targetCase = url.searchParams.get('toCase');

  const errors = [];

  if (originalText === '') {
    errors.push({
      message:
        'Text to convert is required.' +
        ' ' +
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (targetCase === null) {
    errors.push({
      message:
        '"toCase" query param is required.' +
        ' ' +
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (
    !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(targetCase)
  ) {
    errors.push({
      message:
        'This case is not supported.' +
        ' ' +
        'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(`http://${process.env.HOST ?? 'localhost'}${req.url}`);

    const errors = validateURL(url);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');
    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.writeHead(200);

    res.end(
      JSON.stringify({
        originalText,
        originalCase,
        convertedText,
        targetCase,
      }),
    );
  });
}

module.exports = { createServer };
