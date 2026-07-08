const http = require('node:http');

const { convertToCase } = require('./convertToCase/index.js');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [pathname, query] = req.url.split('?');
    const params = new URLSearchParams(query);

    const textToConvert = pathname ? decodeURIComponent(pathname).slice(1) : '';
    const toCase = params.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify({ errors }));
    }

    try {
      const result = convertToCase(textToConvert, toCase);

      res.statusCode = 200;
      res.statusMessage = 'OK';

      const responsePayload = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      };

      return res.end(JSON.stringify(responsePayload));
    } catch (error) {
      res.statusCode = 500;
      res.statusMessage = 'Internal Server Error';

      return res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });
};

module.exports = {
  createServer,
};
