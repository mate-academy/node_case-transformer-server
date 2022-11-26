const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const urlArr = req.url.split('?');
    const text = urlArr[0].slice(1);
    const params = new URLSearchParams(urlArr[1]);
    const toCase = params.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

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
    } else if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)
    ) {
      errors.push({
        message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    } else {
      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(JSON.stringify({
        ...convertToCase(text, toCase),
        targetCase: toCase,
        originalText: text,
      }));
    }
  });
}

module.exports = {
  createServer,
};
