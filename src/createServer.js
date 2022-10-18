const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = new URLSearchParams(url.searchParams).get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const textRequired = 'Text to convert is required. '
            + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    const caseRequired = '"toCase" query param is required. '
            + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    const invalidCase = 'This case is not supported. '
            + `Available cases: ${cases.join(', ')}.`;

    const errors = [];

    if (!originalText) {
      errors.push({ message: textRequired });
    }

    if (!targetCase) {
      errors.push({ message: caseRequired });
    } else if (!cases.includes(targetCase)) {
      errors.push({ message: invalidCase });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    } else {
      res.statusCode = 200;
    }

    const {
      originalCase, convertedText,
    } = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });
};

module.exports = { createServer };
