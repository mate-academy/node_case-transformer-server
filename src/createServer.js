const { convertToCase } = require('./convertToCase/convertToCase');
const http = require('http');

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');
    const errors = [];

    if (!originalText) {
      errors.push({ message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (targetCase === null) {
      errors.push({ message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    } else if (!cases.includes(targetCase)) {
      errors.push({ message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify(
        {
          errors,
        },
      ));

      return;
    }

    const converted = convertToCase(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify({
      ...converted,
      targetCase,
      originalText,
    }));
  });
}

module.exports = { createServer };
