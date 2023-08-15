const http = require('http');
const { convertToCase } = require('./convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textForConverting = req.url.split('?')[0].slice(1);
    const params = Object.fromEntries(normalizedURL.searchParams.entries());
    const errors = [];

    if (textForConverting.length === 0) {
      errors.push({
        message: 'Text to convert is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!params.toCase) {
      errors.push({
        message: '"toCase" query param is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!CASES.includes(params.toCase)) {
      errors.push({
        message: 'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({ errors }),
      );

      return;
    }

    const convertedText = convertToCase(textForConverting, params.toCase);

    const resultBody = {
      originalCase: convertedText.originalCase,
      targetCase: params.toCase,
      originalText: textForConverting,
      convertedText: convertedText.convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(resultBody));
  });

  return server;
};

module.exports.createServer = createServer;
