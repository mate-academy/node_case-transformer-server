const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [text, queryString] = req.url.split('?');

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const initialText = text.slice(1);

    const errors = [];
    let result;

    if (!initialText) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!toCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    try {
      result = convertToCase(initialText, toCase);
    } catch {
      if (toCase) {
        errors.push({
          message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
        });
      }
    }

    if (!errors.length) {
      res.statusCode = 200;

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: toCase,
          originalText: initialText,
          convertedText: result.convertedText,
        }),
      );
    } else {
      res.statusCode = 400;

      res.end(
        JSON.stringify({
          errors,
        }),
      );
    }
  });

  return server;
}

module.exports = {
  createServer,
};
