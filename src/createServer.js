const http = require('http');
const { convertToCase: convertTo } = require('./convertToCase');

const createServer = () => http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const url = new URL(req.url, `http://${req.headers.host}`);

  const originalText = url.pathname.slice(1);
  const targetCase = new URLSearchParams(url.searchParams).get('toCase');
  const supportedCases = [
    'SNAKE',
    'KEBAB',
    'CAMEL',
    'PASCAL',
    'UPPER',
  ];

  const errors = [];

  const noTextMessage = 'Text to convert is required. '
  + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

  const noCaseMessage = '"toCase" query param is required. '
  + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

  const invalidCaseMessage = 'This case is not supported. '
  + `Available cases: ${supportedCases.join(', ')}.`;

  if (!originalText) {
    errors.push({
      message: noTextMessage,
    });
  }

  if (!targetCase) {
    errors.push({
      message: noCaseMessage,
    });
  } else if (!supportedCases.includes(targetCase)) {
    errors.push({
      message: invalidCaseMessage,
    });
  }

  if (errors.length) {
    res.statusCode = 400;
    res.statusText = 'Bad request';

    res.end(JSON.stringify({
      errors,
    }));

    return;
  }

  const { originalCase, convertedText } = convertTo(originalText, targetCase);

  res.statusCode = 200;

  res.end(JSON.stringify({
    originalCase,
    targetCase,
    originalText,
    convertedText,
  }));
});

module.exports = { createServer };
