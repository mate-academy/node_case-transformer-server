const http = require('node:http');
const { convertToCase } = require('./convertToCase');

const PORT = process.env.PORT || 3000;
const baseUrl = `http://localhost:${PORT}`;

const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    const normilizedUrl = new URL(req.url, baseUrl);
    const textToConvert = normilizedUrl.pathname.slice(1);
    const caseName = normilizedUrl.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!caseName) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (caseName && !availableCases.includes(caseName.toUpperCase())) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, {
        'Content-Type': 'application/json',
        statusText: 'Bad request',
      });
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const result = convertToCase(textToConvert, caseName);

      res.writeHead(200, {
        'Content-Type': 'application/json',
        statusText: 'OK',
      });

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: caseName.toUpperCase(),
          originalText: textToConvert,
          convertedText: result.convertedText,
        }),
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      res.statusCode = 500;

      res.end(
        JSON.stringify({ errors: [{ message: 'Internal Server Error' }] }),
      );
    }
  });
}

module.exports = { createServer };
