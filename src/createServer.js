const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedUrl.pathname.slice(1);
    const params = Object.fromEntries(normalizedUrl.searchParams.entries());
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const targetCase = params.toCase;
    const errors = [];

    const noText = 'Text to convert is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    const noCase = '"toCase" query param is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
    const wrongCase = 'This case is not supported. '
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

    res.setHeader('Content-Type', 'application/json');

    if (!text) {
      errors.push({
        message: noText,
      });
    };

    if (!targetCase) {
      errors.push({
        message: noCase,
      });
    } else if (!cases.includes(targetCase)) {
      errors.push({
        message: wrongCase,
      });
    };

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    };

    const convertedText = convertToCase(text, targetCase);

    res.statusCode = 200;
    res.statusText = 'OK';

    res.end(JSON.stringify({
      originalCase: convertedText.originalCase,
      targetCase,
      originalText: text,
      convertedText: convertedText.convertedText,
    }));
  });

  return server;
}

module.exports = { createServer };
