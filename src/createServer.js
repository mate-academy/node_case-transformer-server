const http = require('http');
const { convertToCase } = require('./convertToCase');
const { detectCase } = require('./convertToCase/detectCase');
const createServer = () => {
  return http.createServer((req, res) => {
    const errors = [];
    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const normalizedURL = new URL(req.url || '/', `http://localhost:${5700}`);
    const text = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !availableCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request', {
        'Content-Type': 'application/json',
      });

      res.end(
        JSON.stringify({
          errors,
        }),
      );
    } else {
      res.writeHead(200, 'OK', {
        'Content-Type': 'application/json',
      });

      const result = convertToCase(text, toCase);
      const response = {
        originalCase: detectCase(text),
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      };

      res.end(JSON.stringify(response));
    }
  });
};

module.exports = {
  createServer,
};
