const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [path, query] = req.url.split('?');

    if (req.method !== 'GET') {
      res.statusCode = 404;

      return res.end(JSON.stringify({ errors: [{ message: 'Not Found' }] }));
    }

    const pathText = path.slice(1);
    const params = query ? new URLSearchParams(query) : null;
    const toCase = params ? params.get('toCase') : null;

    const errors = [];

    if (!pathText) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (toCase === null || toCase === undefined) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify({ errors }));
    }

    try {
      const { originalCase, convertedText } = convertToCase(pathText, toCase);

      res.statusCode = 200;
      res.statusMessage = 'OK';

      return res.end(
        JSON.stringify({
          originalCase: originalCase,
          targetCase: toCase,
          originalText: pathText,
          convertedText: convertedText,
        }),
      );
    } catch (error) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });

  return server;
};

module.exports = { createServer };
