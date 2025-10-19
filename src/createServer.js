const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const VALID_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [pathPart, queryString] = req.url.split('?');
    const path = pathPart.slice(1);

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];
    let textToConvert = path;

    try {
      textToConvert = decodeURIComponent(path);
    } catch (error) {}

    if (!textToConvert) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !VALID_CASES.includes(toCase)) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const conversionResult = convertToCase(textToConvert, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase: conversionResult.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: conversionResult.convertedText,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
