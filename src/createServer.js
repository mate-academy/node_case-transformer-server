const http = require('http');
const { convertToCase } = require('./convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname.replace(/^\/+/, '');
    const { toCase } = Object.fromEntries(url.searchParams);

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    if (!pathname) {
      errors.push(
        'Text to convert is required.' +
        ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (!toCase) {
      errors.push(
        '"toCase" query param is required.' +
        ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (toCase && !CASES.includes(toCase)) {
      errors.push(
        'This case is not supported. ' +
        'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      );
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';

      res.end(
        JSON.stringify({
          errors: errors.map((error) => ({ message: error })),
        }),
      );

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const { originalCase, convertedText } = convertToCase(pathname, toCase);

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: pathname,
        convertedText,
      }),
    );
  });
};

module.exports = { createServer };
