
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { paramsValidation } = require('./paramsValidation');

// const caseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => http.createServer((req, res) => {
  const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
  const originalText = normalizedURL.pathname.slice(1);
  const targetCase = normalizedURL.searchParams.get('toCase') || '';

  res.setHeader('Content-type', 'application/json');

  const errors = paramsValidation(originalText, targetCase);

  if (errors.length) {
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
