/* eslint-disable max-len */
/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    const errors = [];
    const addErrMsg = (msg) => errors.push({ message: msg });

    if (req.url === '/favicon.ico') {
      res.writeHead(204);

      return res.end();
    }

    if (!originalText) {
      addErrMsg(
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (!targetCase) {
      addErrMsg(
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    } else {
      try {
        const { originalCase, convertedText } = convertToCase(
          originalText,
          targetCase,
        );

        const responseObject = {
          originalCase,
          targetCase,
          originalText,
          convertedText,
        };

        if (!errors.length) {
          res.writeHead(200);

          return res.end(JSON.stringify(responseObject, null, 2));
        }
      } catch {
        addErrMsg(
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        );
      }
    }

    res.writeHead(400);
    res.end(JSON.stringify({ errors }, null, 2));
  });

  return server;
}

module.exports = {
  createServer,
};
