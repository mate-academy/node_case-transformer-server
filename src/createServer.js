const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const params = Object.fromEntries(normalizedUrl.searchParams.entries());
    const actualeCase = params.toCase;
    const cases = ['SNAKE', 'KEBAB', 'UPPER', 'PASCAL', 'CAMEL'];

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    if (!originalText) {
      errors.push({ message: 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    };

    if (!actualeCase) {
      errors.push({ message: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    } else if (!(cases.includes(actualeCase))) {
      errors.push({ message: 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    const {
      originalCase, convertedText,
    } = convertToCase(originalText, actualeCase);

    res.statusCode = 200;
    res.statusText = 'OK';

    res.end(JSON.stringify({
      originalCase,
      targetCase: actualeCase,
      originalText,
      convertedText,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
