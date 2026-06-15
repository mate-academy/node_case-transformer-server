const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString || '');
    const errorResponse = { errors: [] };

    if (!path || path === '/') {
      errorResponse.errors.push({
        message:
          `Text to convert is required. ` +
          `Correct request is: ` +
          `"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    const toCase = params.get('toCase');

    if (!toCase) {
      errorResponse.errors.push({
        message:
          `"toCase" query param is required. ` +
          `Correct request is: ` +
          `"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    } else if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)
    ) {
      errorResponse.errors.push({
        message:
          `This case is not supported. Available cases: ` +
          `SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errorResponse.errors.length > 0) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(errorResponse));
    } else {
      const originalText = path.slice(1);
      const result = convertToCase(originalText, toCase);
      const { originalCase, convertedText } = result;

      const response = {
        originalCase: originalCase,
        targetCase: toCase,
        originalText: originalText,
        convertedText: convertedText,
      };

      res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    }
  });
}

module.exports = { createServer };
