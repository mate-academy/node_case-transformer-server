/* eslint-disable max-len */
const { convertToCase } = require('./convertToCase/convertToCase');
const http = require('http');

const createMessage = (text) => {
  return { message: text };
};

const convertCase = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, 'http://localhost:5700');
    const params = Object.fromEntries(normalizedURL.searchParams.entries());
    const textToConvert = normalizedURL.pathname.slice(1);

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    try {
      const result = convertToCase(textToConvert, params.toCase);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      if (!textToConvert) {
        errors.push(
          createMessage(
            'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          ),
        );
      }

      if (!params.toCase) {
        errors.push(
          createMessage(
            'toCase query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"',
          ),
        );
      }

      if (!convertCase.includes(params.toCase)) {
        errors.push(
          createMessage(
            'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
          ),
        );
      }

      if (errors.length > 0) {
        res.statusCode = 400;
        res.end(JSON.stringify({ errors }));

        return;
      }

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: params.toCase,
          originalText: textToConvert,
          convertedText: result.convertedText,
        }),
      );
    } catch (error) {
      res.statusCode = 400;

      res.end();
    }
  });
};

module.exports = { createServer };
