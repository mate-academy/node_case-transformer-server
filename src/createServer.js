const { convertToCase } = require('./convertToCase/convertToCase');
const http = require('http');

const caseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessage = {
  // eslint-disable-next-line max-len
  textIsReq: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  // eslint-disable-next-line max-len
  caseIsReq: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  // eslint-disable-next-line max-len
  caseIsNotSupp: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    if (!originalText && !targetCase) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.textIsReq },
          { message: errorMessage.caseIsReq },
        ],
      }));

      res.end();

      return;
    }

    if (!originalText && caseName.includes(targetCase)) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.textIsReq },
        ],
      }));

      res.end();

      return;
    }

    if (!targetCase) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.caseIsReq },
        ],
      }));

      res.end();

      return;
    }

    if (!originalText && !caseName.includes(targetCase)) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.textIsReq },
          { message: errorMessage.caseIsNotSupp },
        ],
      }));

      res.end();

      return;
    }

    if (!caseName.includes(targetCase)) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: [
          { message: errorMessage.caseIsNotSupp },
        ],
      }));

      res.end();

      return;
    }

    res.statusCode = 200;

    const { originalCase, convertedText } = convertToCase(
      originalText, targetCase,
    );

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.write(JSON.stringify(result));
    res.end();
  });

  return server;
};

createServer();

module.exports = { createServer };
