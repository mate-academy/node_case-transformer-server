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

    if (!path) {
      errors.push({
        message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!cases.includes(targetCase)) {
      errors.push({
        message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
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

    const convertedText = convertToCase(path, targetCase);

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify({
      originalCase: convertedText.originalCase,
      targetCase,
      originalText: path,
      convertedText: convertedText.convertedText,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
