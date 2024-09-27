const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => (http.createServer((req, res) => {

  const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
  const text = normalizedURL.pathname.slice(1);
  const toCase = normalizedURL.searchParams.get('toCase');

    res.setHeader('Content-type', 'application/json');

    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if(!text) {
      errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      })
    }

    if(!toCase) {
      errors.push({
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      })
    }

    if(!cases.includes(toCase) && toCase) {
      errors.push({
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      })
    }

    if (errors.length !== 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({errors}));

      return;
    }

    res.statusCode = 200;

    res.end(JSON.stringify({
      originalCase: convertToCase(text, toCase).originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: convertToCase(text, toCase).convertedText,
    }));
  })
);

module.exports = { createServer };
