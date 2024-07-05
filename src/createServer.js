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

    if (!textToConvert) {
      res.statusCode = 400;

      const errorResponse = {
        errors: [
          {
            message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
          },
        ],
      };

      res.end(JSON.stringify(errorResponse));

      return;
    }

    const params = new URLSearchParams(splitedReq[1]);
    const toCase = params.get('toCase');

    if (!toCase) {
      res.statusCode = 400;

      const errorResponse = {
        errors: [
          {
            message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
          },
        ],
      };

      res.end(JSON.stringify(errorResponse));

      return;
    }

    if (!types.includes(toCase)) {
      res.statusCode = 400;

      const errorResponse = {
        errors: [
          {
            message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
          },
        ],
      };

      res.end(JSON.stringify(errorResponse));

      return;
    }

    if (!textToConvert && !types.includes(toCase)) {
      res.statusCode = 400;

      const errorResponse = {
        errors: [
          {
            message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
          },
          {
            message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
          },
        ],
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
