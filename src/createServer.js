const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const params = new URLSearchParams(req.url.split('?')[1]);
    const text = req.url.slice(1).split('?')[0];
    const toCase = params.get('toCase');
    const errorData = {
      errors: [],
    };

    res.setHeader('Content-Type', 'application/json');

    try {
      const result = convertToCase(text, toCase);

      res.end(JSON.stringify(result));
    } catch {
      if (!text.trim()) {
        errorData.errors.push({
          message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        });
      } else if (!toCase) {
        errorData.errors.push({
          message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        });
      } else {
        errorData.errors.push({
          message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
        });
      }

      res.end(JSON.stringify(errorData));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
