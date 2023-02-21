const http = require('http');
const { convertToCase } = require('./convertToCase');

const cases = [
  'SNAKE',
  'KEBABS',
  'CAMEL',
  'PASKAL',
  'UPPER',
];

const createServer = () => {
  const server = http.createServer((req, res) => {
    const correctUrl = new URL(req.url, 'http://localhost');
    const text = correctUrl.pathname.slice(1);
    const toCase = correctUrl.searchParams.get('toCase');
    const errors = [];

    res.setHeader('Content-type', 'application/json');

    if (!text.length) {
      errors.push({
        message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!correctUrl.searchParams.has('toCase')) {
      errors.push({
        message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!cases.includes(toCase)) {
      errors.push({
        message: 'This case is not supported. '
        + 'Aviable cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));
    }

    const result = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusText = 'Ok';

    res.end(JSON.stringify({
      originalCase: result.originCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
