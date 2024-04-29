const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, 'http://localhost:5700');

    const availableToCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const requestText = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');
    const errors = [];

    if (!requestText) {
      errors.push({
        message:
          /* eslint-disable-next-line */
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          /* eslint-disable-next-line */
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!availableToCases.includes(toCase)) {
      errors.push({
        message:
          /* eslint-disable-next-line */
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const convertedText = convertToCase(requestText, toCase);

      res.statusCode = 200;

      const respBody = {
        originalCase: convertedText.originalCase,
        targetCase: toCase,
        originalText: requestText,
        convertedText: convertedText.convertedText,
      };

      res.end(JSON.stringify(respBody));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });

  return server;
};

module.exports = { createServer };
