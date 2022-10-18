const http = require('http');
const convertToCase = require('./convertToCase').convertToCase;

const cases = ['SNAKE',
  'KEBAB',
  'CAMEL',
  'PASCAL',
  'UPPER',
];

const errorsAnswers = {
  noText: 'Text to convert is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noToCase: '"toCase" query param is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidToCase: 'This case is not supported.'
    + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function createServer() {
  const server = http.createServer();

  server.on('request', (req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const originalText = normalizedUrl.pathname.slice(1);
    const { toCase: targetCase } = Object.fromEntries(normalizedUrl.searchParams
      .entries());

    const errors = [];

    if (!originalText) {
      errors.push({
        message: errorsAnswers.noText,
      });
    }

    if (!targetCase) {
      errors.push({
        message: errorsAnswers.noToCase,
      });
    } else if (!cases.includes(targetCase)) {
      errors.push({
        message: errorsAnswers.invalidToCase,
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad Request';

      res.end(JSON.stringify({ errors }));
    } else {
      res.statusCode = 200;
      res.statusText = 'OK';

      res.end(JSON.stringify({
        ...convertToCase(
          originalText,
          targetCase,
        ),
        originalText,
        targetCase,
      }));
    }

    res.end();
  });

  return server;
};

module.exports = {
  createServer,
};
