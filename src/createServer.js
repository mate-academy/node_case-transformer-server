const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');
const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Not Found' }));

      return;
    }

    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    const text = decodeURIComponent(myUrl.pathname.slice(1));
    const toCase = myUrl.searchParams.get('toCase');
    const errors = [];

    if (!text) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!toCase) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');

      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    } else if (!SUPPORTED_CASES.includes(toCase.toUpperCase())) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const toCaseRes = toCase.toUpperCase();
    const result = convertToCase(text, toCaseRes);

    const response = {
      originalText: text,
      targetCase: toCaseRes,
      ...result,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = {
  createServer,
};
