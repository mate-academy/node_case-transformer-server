const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

function createServer() {
  const types = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.statusMessage = 'OK';

    if (req.url === '/') {
      res.statusCode = 400;

      const errorResponse = {
        errors: [
          {
            message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
          },
          {
            message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
          },
        ],
      };

      res.end(JSON.stringify(errorResponse));

      return;
    }

    const splitedReq = req.url.split('?');
    const textToConvert = splitedReq[0].slice(1);

    const params = new URLSearchParams(splitedReq[1]);
    const toCase = params.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!toCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (toCase && !types.includes(toCase)) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;

      const errorResponse = {
        errors,
      };

      res.end(JSON.stringify(errorResponse));

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    result.targetCase = toCase;
    result.originalText = textToConvert;

    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = {
  createServer,
};
