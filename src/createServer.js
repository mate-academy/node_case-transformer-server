const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

/**
 * @returns {http.Server}
 */
function createServer() {
  return http.createServer((req, res) => {
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    let pathname = '';
    let toCase = '';

    try {
      const fullUrl = new URL(req.url, `http://${req.headers.host}`);

      pathname = fullUrl.pathname.slice(1);
      toCase = fullUrl.searchParams.get('toCase');
    } catch (e) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';

      res.end(
        JSON.stringify({
          errors: [{ message: 'Invalid URL' }],
        }),
      );

      return;
    }

    if (!pathname) {
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

    if (toCase && !SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify({ errors }, null, 2));

      return;
    }

    try {
      const result = convertToCase(pathname, toCase);

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(
        JSON.stringify(
          {
            originalCase: result.originalCase,
            targetCase: toCase,
            originalText: pathname,
            convertedText: result.convertedText,
          },
          null,
          2,
        ),
      );
    } catch (err) {
      res.statusCode = 500;
      res.statusMessage = 'Internal Server Error';

      res.end(
        JSON.stringify({
          errors: [{ message: 'Something went wrong on the server.' }],
        }),
      );
    }
  });
}

module.exports = {
  createServer,
};
