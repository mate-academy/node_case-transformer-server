const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const noText = 'Text to convert is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    const noCase = '"toCase" query param is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    const wrongCase = 'This case is not supported.'
    + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

    const normalizeURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizeURL.pathname.slice(1);
    const targetCase = normalizeURL.searchParams.get('toCase');
    const errors = [];

    if (!originalText) {
      errors.push({
        message: noText,
      });
    }

    if (!targetCase) {
      errors.push({
        message: noCase,
      });
    } else if (!cases.includes(targetCase)) {
      errors.push({
        message: wrongCase,
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Wrong request';

      res.end(JSON.stringify({ errors }));
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      res.statusCode = 200;
      res.statusText = 'OK';

      res.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }));
    }
  });
};

module.exports = {
  createServer,
};
