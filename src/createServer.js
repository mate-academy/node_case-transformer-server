const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const urlParams = new URL(`http://${req.headers.host}${req.url}`);
    const textToConvert = urlParams.pathname.replace('/', '');
    const caseName = urlParams.searchParams.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({
        // eslint-disable-next-line
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!caseName) {
      errors.push({
        // eslint-disable-next-line
        message: '\"toCase\" query param is required. Correct request is: \"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>\".',
      });
    }

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (caseName && !supportedCases.includes(caseName.toUpperCase())) {
      errors.push({
        // eslint-disable-next-line
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, caseName);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: caseName.toUpperCase(),
      convertedText: result.convertedText,
      originalText: textToConvert,
    }));
  });

  return server;
}

module.exports = { createServer };
