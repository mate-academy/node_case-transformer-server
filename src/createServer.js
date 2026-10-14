const { convertToCase } = require('./convertToCase');
const http = require('http');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    const parsedUrl = new URL(
      req.url,
      `http://${req.headers.host || 'localhost'}`,
    );
    const pathname = parsedUrl.pathname;

    const textParam = pathname.slice(1);
    const toCaseParam = parsedUrl.searchParams.get('toCase');

    const errors = [];

    if (!textParam) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCaseParam) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(toCaseParam)) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const { originalCase, convertedText } = convertToCase(
        textParam,
        toCaseParam,
      );

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(
        JSON.stringify({
          originalCase,
          targetCase: toCaseParam,
          originalText: textParam,
          convertedText,
        }),
      );
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ errors: [{ message: err.message }] }));
    }
  });
}

module.exports = {
  createServer,
};
