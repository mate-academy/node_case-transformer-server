const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = normalizedUrl.pathname.slice(1);
    const query = Object.fromEntries(normalizedUrl.searchParams.entries());
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const targetCase = query.toCase;
    const errors = [];

    const noText = 'Text to convert is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    const noCase = '"toCase" query param is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    const invalidCase = 'This case is not supported. '
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

    if (!path) {
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
        message: invalidCase,
      });
    }

    if (errors.length) {
      res.writeHead(400, {
        'Content-Type': 'application/json',
      });
      res.statusText = 'Bad Request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(path, targetCase);

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText: path,
      convertedText,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
