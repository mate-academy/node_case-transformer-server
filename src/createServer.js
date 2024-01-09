const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const BASE = 'http://localhost:5701';

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const reqUrl = new URL(BASE + req.url, BASE);
    const originalText = reqUrl.pathname.slice(1);
    const targetCase = reqUrl.searchParams.get('toCase');

    const errors = [];

    let conversionResult = {
      originalCase: null,
      convertedText: null,
    };

    if (!originalText) {
      errors.push({
        message: 'Text to convert is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else {
      try {
        conversionResult = convertToCase(originalText, targetCase);
      } catch {
        errors.push({
          message: 'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
    }

    const { originalCase, convertedText } = conversionResult;

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.write(JSON.stringify({
        errors,
      }));
    } else {
      res.statusCode = 200;

      const resultObj = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.write(JSON.stringify(resultObj));
    }

    res.end();
  });

  return server;
};

module.exports = { createServer };
