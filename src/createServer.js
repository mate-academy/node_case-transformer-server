
const  http  = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const text = pathname.split('?')[0].slice(1);
  const toCase = searchParams.get('toCase');

  res.setHeader('Content-Type', 'application/json');
  const errors = [];

  const isToCaseValid = (caseName) => {
    const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    return validCases.includes(caseName);
  };

  if (!text) {
    errors.push({
      message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (!isToCaseValid(toCase)) {
    errors.push({
      message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (errors.length) {
    res.statusCode = 400;
    res.statusText = 'Bad request';

    res.end(JSON.stringify({errors}));
    return;
  }

  const convertedResult = convertToCase(text, toCase);
  res.statusCode = 200;

  res.end(JSON.stringify({
    'originalCase': convertedResult.originalCase,
    'targetCase': toCase,
    'originalText': text,
    'convertedText': convertedResult.convertedText,
  }));
});

module.exports = { createServer };
