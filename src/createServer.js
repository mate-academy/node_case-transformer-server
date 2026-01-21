const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];
    const text = path.slice(1);

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message: `This case is not supported. Available cases: ${SUPPORTED_CASES.join(', ')}.`,
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));
      return;
    }

    try {
      const result = convertToCase(text, toCase);

      const responseBody = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(responseBody));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          errors: [{ message: `Internal server error: ${error.message}` }],
        })
      );
    }
  });
}

module.exports = { createServer };
