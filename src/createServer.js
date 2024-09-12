const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [url, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);
    const originalText = url.slice(1);
    const targetCase = params.get('toCase');

    const isError = !originalText
      || !SUPPORTED_CASES.includes(targetCase)
      || !targetCase;

    if (isError) {
      const errorMessages = [];

      if (!originalText) {
        errorMessages.push({
          // eslint-disable-next-line max-len
          message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!targetCase) {
        errorMessages.push({
          // eslint-disable-next-line max-len
          message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!SUPPORTED_CASES.includes(targetCase) && targetCase) {
        errorMessages.push({
          message: `This case is not supported. Available cases: ${SUPPORTED_CASES.join(', ')}.`,
        });
      }

      res.writeHead(400, 'Bad request');

      res.end(JSON.stringify({
        errors: errorMessages,
      }));
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      res.writeHead(200, 'OK');

      res.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }));
    }
  });

  return server;
};

module.exports = { createServer };
