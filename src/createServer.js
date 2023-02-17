const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizeUrl = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = normalizeUrl.pathname.slice(1);

    const params = Object.fromEntries(normalizeUrl.searchParams.entries());

    const toCase = params.toCase;

    const cases = [
      'SNAKE',
      'KEBAB',
      'CAMEL',
      'PASCAL',
      'UPPER',
    ];

    const ArrOfErrors = [];

    res.setHeader('Context-Type', 'application/json');

    if (!textToConvert) {
      ArrOfErrors.push({
        message: 'Text to convert is required. Correct request is: '
        + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    };

    if (!toCase) {
      ArrOfErrors.push({
        message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!cases.includes(toCase)) {
      ArrOfErrors.push({
        message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (ArrOfErrors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ ArrOfErrors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert, toCase,
    );

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase,
      convertedText,
      targetCase: toCase,
      originalText: textToConvert,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
