const { convertToCase } = require('./convertToCase/convertToCase');
const http = require('http');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const partsUrl = req.url.split('?');
    const params = new URLSearchParams(partsUrl[1]);
    const toCase = params.get('toCase');
    const errors = [];
    const text = partsUrl[0].slice(1);
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (text.length === 0) {
      errors.push({
        // eslint-disable-next-line max-len
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        // eslint-disable-next-line max-len
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!cases.includes(toCase) && toCase) {
      errors.push({
        // eslint-disable-next-line max-len
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      const errorResponse = {
        errors,
      };

      res.setHeader('Content-Type', 'application/json');

      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.end(JSON.stringify(errorResponse));

      return;
    }

    const resultData = convertToCase(text, toCase);
    const result = {
      convertedText: resultData.convertedText,
      originalCase: resultData.originalCase,
      originalText: text,
      targetCase: toCase,
    };

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.write(JSON.stringify(result));
    res.end();
  });

  return server;
};

module.exports = {
  createServer,
};
