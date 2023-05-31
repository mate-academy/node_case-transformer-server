/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const textToTransform = req.url.slice(1).split('?')[0];
    const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const queryString = req.url.slice(1).split('?')[1];
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const validation = {
      errors: [],
    };

    res.setHeader('Content-Type', 'application/json');

    if (!textToTransform) {
      validation.errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      validation.errors.push({
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!(allowedCases.includes(toCase)) && toCase) {
      validation.errors.push({
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (validation.errors.length) {
      const result = JSON.stringify(validation);

      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(result);
    }

    if (!validation.errors.length) {
      const {
        originalCase,
        convertedText,
      } = convertToCase(textToTransform, toCase);

      const result = JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: textToTransform,
        convertedText,
      });

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(result);
    }
  });

  return server;
};

module.exports.createServer = createServer;
