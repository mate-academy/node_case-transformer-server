const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    const contentTypeHeader = { 'Content-Type': 'application/json' };

    try {
      const errors = [];

      if (!req.url || req.url === '/') {
        errors.push({
          message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        });
      }

      const [path, queryString] = req.url.split('?') || [];
      const params = new URLSearchParams(queryString);
      const toCase = params.get('toCase');

      if (!toCase) {
        errors.push({
          message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        });
      }

      const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

      if (toCase && !supportedCases.includes(toCase)) {
        errors.push({
          message: `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
        });
      }

      const textToConvert = path?.slice(1);

      if (!textToConvert && !req.url.startsWith('?')) {
        errors.push({
          message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        });
      }

      if (errors.length > 0) {
        res.writeHead(400, 'Bad Request', contentTypeHeader);

        return res.end(JSON.stringify({ errors }));
      }

      const result = convertToCase(textToConvert, toCase);

      res.writeHead(200, 'OK', contentTypeHeader);

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: toCase,
          originalText: textToConvert,
          convertedText: result.convertedText,
        }),
      );
    } catch (error) {
      res.writeHead(500, 'Internal Server Error', contentTypeHeader);
      res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });
};

module.exports = { createServer };
