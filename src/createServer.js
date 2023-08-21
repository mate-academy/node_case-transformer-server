const http = require('http');
const { convertToCase } = require('./convertToCase');
const cases = ['UPPER', 'PASCAL', 'CAMEL', 'KEBAB', 'SNAKE'];

function createServer() {
  const server = http.createServer((req, res) => {
    const errors = [];
    const params = req.url.split('?');
    const [path, query] = params;
    const receivedText = path.slice(1);
    const toCase = new URLSearchParams(query).get('toCase');

    if (!receivedText) {
      errors.push({
        message: 'Text to convert is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!cases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length !== 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedToCase = convertToCase(receivedText, toCase);

    const caseConversionResponse = {
      targetCase: toCase,
      originalCase: convertedToCase.originalCase,
      convertedText: convertedToCase.convertedText,
      originalText: receivedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' })
      .end(JSON.stringify(caseConversionResponse));
  });

  return server;
}

module.exports.createServer = createServer;
