const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const textToReplace = normalizedURL.pathname.slice(1);
    const currentCase = normalizedURL.searchParams.get('toCase');
    const acceptedCases = ['UPPER', 'CAMEL', 'SNAKE', 'KEBAB', 'PASCAL'];
    const errors = [];

    if (!textToReplace) {
      errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!currentCase) {
      errors.push({
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!acceptedCases.includes(currentCase) && currentCase) {
      errors.push({
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToReplace, currentCase)

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: currentCase,
      originalText: textToReplace,
      convertedText: result.convertedText,
    }));
  });

  return server;
}

module.exports = { createServer };
