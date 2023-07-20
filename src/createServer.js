/* eslint-disable max-len */
const { convertToCase } = require('./convertToCase/convertToCase');
const http = require('http');

const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessage = {
  missingText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  missingCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  unavailableCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    if (!originalText && !targetCase) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.missingText },
          { message: errorMessage.missingCase },
        ],
      }));

      res.end();

      return;
    }

    if (!originalText && availableCases.includes(targetCase)) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.missingText },
        ],
      }));

      res.end();

      return;
    }

    if (!targetCase) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.missingCase },
        ],
      }));

      res.end();

      return;
    }

    if (!originalText && !availableCases.includes(targetCase)) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.missingText },
          { message: errorMessage.unavailableCase },
        ],
      }));

      res.end();

      return;
    }

    if (!availableCases.includes(targetCase)) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.unavailableCase },
        ],
      }));

      res.end();

      return;
    }

    res.statusCode = 200;

    const { originalCase, convertedText } = convertToCase(
      originalText, targetCase,
    );

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.write(JSON.stringify(result));
    res.end();
  });

  return server;
};

createServer();

module.exports = { createServer };
