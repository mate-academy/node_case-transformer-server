const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const parts = url.pathname
    .slice(1)
    .split('/')
    .filter(part => part);
  const query = Object.fromEntries(url.searchParams.entries());
  const errors = [];
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!parts.length || parts.length > 1) {
    errors.push({
      message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!query.toCase) {
    errors.push({
      message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (!(cases.includes(query.toCase))) {
    errors.push({
      message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  res.setHeader('Content-Type', 'application/json');

  if (errors.length) {
    res.statusCode = 400;
    res.statusText = 'Bad request';
    res.end(JSON.stringify(errors));

    return;
  }

  const originalText = parts[0];
  const targetCase = query.toCase;
  const {
    originalCase,
    convertedText,
  } = convertToCase(originalText, targetCase);

  res.statusCode = 200;

  res.end(JSON.stringify({
    originalCase,
    targetCase,
    originalText,
    convertedText,
  }));
});

module.exports = {
  createServer,
};
