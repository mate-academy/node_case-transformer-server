const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const textToConvert = url.pathname.split('?')[0].slice(1);
  const toCase = url.searchParams.get('toCase');
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  res.setHeader('Content-Type', 'application/json');

  if (!textToConvert) {
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
  } else if (!cases.includes(toCase)) {
    errors.push({
      message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  if (errors.length) {
    res.statusCode = 400;
    res.statusText = 'Bad request';

    res.end(JSON.stringify({ errors }));

    return;
  }

  const convertedResult = convertToCase(textToConvert, toCase);

  res.statusCode = 200;

  res.end(JSON.stringify({
    originalCase: convertedResult.originalCase,
    targetCase: toCase,
    originalText: textToConvert,
    convertedText: convertedResult.convertedText,
  }));
});

module.exports = { createServer };
