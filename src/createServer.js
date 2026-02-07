const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedUrl.pathname.slice(1);
    const caseType = normalizedUrl.searchParams.get('toCase');

    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!caseType) {
      errors.push({
        message:
          '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (caseType) {
      try {
        convertToCase('test', caseType);
      } catch (error) {
        errors.push({
          message:
            'This case is not supported. ' +
            'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const result = convertToCase(text, caseType);

      res.statusCode = 200;

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: caseType,
          originalText: text,
          convertedText: result.convertedText,
        }),
      );
    } catch (error) {
      res.statusCode = 400;

      res.end(
        JSON.stringify({
          errors: [
            {
              message:
                'This case is not supported. ' +
                'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
            },
          ],
        }),
      );
    }
  });
}

module.exports = {
  createServer,
};
