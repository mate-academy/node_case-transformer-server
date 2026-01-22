const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const errors = {
      errors: [],
    };

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const targetCase = normalizedUrl.searchParams.get('toCase');
    const originalText = normalizedUrl.pathname.slice(1);
    const result = {};

    if (!targetCase) {
      errors.errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else {
      try {
        const { originalCase, convertedText } = convertToCase(
          originalText,
          targetCase,
        );

        result.originalCase = originalCase;
        result.convertedText = convertedText;
      } catch (error) {
        errors.errors.push({
          message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
        });
      }
    }

    if (!originalText) {
      errors.errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (errors.errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(errors));
    } else {
      result.targetCase = targetCase;
      result.originalText = originalText;

      res.statusCode = 200;
      res.end(JSON.stringify(result));
    }
  });
}

module.exports = {
  createServer,
};
