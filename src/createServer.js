const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const server = http.createServer((req, res) => {
    const [url, params] = req.url.split('?');
    const queryParams = new URLSearchParams(params);
    const toCase = queryParams.get('toCase');
    const originalText = url.slice(1);
    const errors = [];

    if (!originalText) {
      errors.push({
        message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.includes(toCase?.toUpperCase())) {
      errors.push({
        message: 'This case is not supported. '
        + `Available cases: ${supportedCases.join(', ')}.`,
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(originalText, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText,
      convertedText: result.convertedText,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
