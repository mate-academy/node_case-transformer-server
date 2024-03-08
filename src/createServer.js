const http = require('http');

const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const errors = [];

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = normalizedURL.pathname.slice(1);

    const caseName = normalizedURL.searchParams.get('toCase');

    if (!textToConvert) {
      errors.push(
        {
          message:
            'Text to convert is required. Correct request is:'
            + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        },
      );
    }

    if (!caseName) {
      errors.push(
        {
          message:
            '"toCase" query param is required. Correct request'
            + ' is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        },
      );
    } else if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']
        .includes(caseName.toUpperCase())
    ) {
      errors.push(
        {
          message: 'This case is not supported. Available'
            + ' cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        },
      );
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad Request', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));
    } else {
      res.writeHead(200, 'OK', {
        'Content-Type': 'application/json',
      });

      const { originalCase, convertedText } = convertToCase(
        textToConvert, caseName,
      );

      const object = {
        originalCase,
        targetCase: caseName,
        originalText: textToConvert,
        convertedText,
      };

      res.end(JSON.stringify(object));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
