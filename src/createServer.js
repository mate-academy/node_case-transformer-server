const { convertToCase } = require('./convertToCase');
const http = require('http');

const PORT = process.argv.PORT || 3006;

const allCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorsMessages = {
  // eslint-disable-next-line max-len
  invalidCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  // eslint-disable-next-line max-len
  noText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  // eslint-disable-next-line max-len
  noCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
};

const createServer = () => {
  return (
    http.createServer((req, res) => {
      const url = new URL(req.url, `http://localhost:${PORT}`);
      const originalText = url.pathname.slice(1);
      const targetCase = url.searchParams.get('toCase');
      const errors = [];

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      if (!originalText) {
        errors.push({
          message: errorsMessages.noText,
        });
      }

      if (targetCase && !allCases.includes(targetCase)) {
        errors.push({
          message: errorsMessages.invalidCase,
        });
      }

      if (!targetCase) {
        errors.push({
          message: errorsMessages.noCase,
        });
      }

      if (errors.length) {
        res.statusCode = 400;
        res.end(JSON.stringify({ errors }));

        return;
      }

      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      res.end(JSON.stringify({
        originalText,
        originalCase,
        targetCase,
        convertedText,
      }));
    })

  );
};

module.exports = { createServer };
