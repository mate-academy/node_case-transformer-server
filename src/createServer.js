const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const toCaseValues = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const respondErrors = [];

    const requestParts = req.url.split('?');
    const textToConvert = requestParts[0].slice(1);
    const params = new URLSearchParams(requestParts[1]);
    const toCase = params.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    if (!textToConvert) {
      respondErrors.push({
        message: 'Text to convert is required. Correct request is: '
          + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      respondErrors.push({
        message: '"toCase" query param is required. Correct request is: '
          + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!toCaseValues.includes(toCase)) {
      respondErrors.push({
        message: 'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (respondErrors.length !== 0) {
      res.statusCode = 404;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors: respondErrors,
      }));
    } else {
      const result = convertToCase(textToConvert, toCase);

      res.statusCode = 200;
      req.statusMessage = 'OK';

      res.end(JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      }));
    }
  });

  return server;
}

module.exports.createServer = createServer;
