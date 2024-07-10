const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const params = new URLSearchParams(req.url.split('?')[1]);
    const text = req.url.slice(1).split('?')[0];
    const toCase = params.get('toCase');
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errorData = {
      errors: [],
    };

    res.setHeader('Content-Type', 'application/json');

    try {
      if (!text.trim()) {
        throw Error;
      }

      const result = convertToCase(text, toCase);

      res.end(JSON.stringify(result));
    } catch {
      if (!toCase) {
        errorData.errors.push({
          message:
            // eslint-disable-next-line max-len
            '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      } else if (!cases.includes(toCase)) {
        errorData.errors.push({
          message:
            // eslint-disable-next-line max-len
            'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }

      if (!text.trim()) {
        errorData.errors.push({
          message:
            // eslint-disable-next-line max-len
            'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
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
