const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer(params) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const toCase = url.searchParams.get('toCase');
    const textToConvert = url.pathname.slice(1);
    const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (textToConvert === '') {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase === null) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify({ errors }));
    }

    const data = convertToCase(textToConvert, toCase);

    const responseData = {
      originalCase: data.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: data.convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';

    return res.end(JSON.stringify(responseData));
  });

  return server;
}

module.exports = { createServer };
