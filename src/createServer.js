
const http = require('http');
const { convertToCase } = require('./convertToCase');

const caseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => http.createServer((req, res) => {
  const errors = [];

  const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
  const originalText = normalizedURL.pathname.slice(1);
  const targetCase = normalizedURL.searchParams.get('toCase') || '';

  res.setHeader('Content-type', 'application/json');

  if (!originalText) {
    errors.push({
      message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".'
    });
  }

  if (!targetCase) {
    errors.push({
      message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".'
    });
  }

  if (targetCase && !caseName.includes(targetCase)) {
    errors.push({
      message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.'
    });
  }

  if (errors.length > 0) {
    res.statusCode = 400;
    res.statusMessage = 'Bad request';

    res.end(
      JSON.stringify({ errors }),
    );

    return;
  }

  const {
    originalCase,
    convertedText,
  } = convertToCase(originalText, targetCase );

  const responseData = {
    originalCase,
    targetCase,
    originalText,
    convertedText,
  };

  res.statusCode = 200;
  res.statusMessage = 'OK';

  res.end(JSON.stringify(responseData));
});

module.exports = { createServer };
