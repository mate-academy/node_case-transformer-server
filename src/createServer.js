const http = require('http');
const { convertToCase } = require('./convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    res.setHeader('Content-Type', 'application/json');

    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const errors = [];

    const addError = (message) => {
      errors.push({ message });
    };

    if (!originalText) {
      addError(
        'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (!targetCase) {
      addError(
        '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    } else if (!CASES.includes(targetCase)) {
      addError(
        'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      );
    }

    if (errors.length) {
      res.statusCode = '400';
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = '200';
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
