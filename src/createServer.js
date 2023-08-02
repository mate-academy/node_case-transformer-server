/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const validateInput = (originalText, targetCase) => {
  const errorArray = [];
  const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!originalText) {
    errorArray.push(
      new Error(
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      ),
    );
  }

  if (!targetCase) {
    errorArray.push(
      new Error(
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      ),
    );

    throw errorArray;
  }

  if (!validCases.includes(targetCase)) {
    errorArray.push(
      new Error(
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      ),
    );
  }

  if (errorArray.length > 0) {
    throw errorArray;
  }
};

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);

    try {
      const originalText = url.pathname.slice(1);
      const targetCase = url.searchParams.get('toCase');

      validateInput(originalText, targetCase);

      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      res.statusCode = 200;

      res.end(
        JSON.stringify({
          originalCase,
          originalText,
          targetCase,
          convertedText,
        }),
      );
    } catch (err) {
      res.statusCode = 400;

      if (Array.isArray(err)) {
        res.end(
          JSON.stringify({
            errors: err.map((error) => ({ message: error.message })),
          }),
        );
      }
    }
  });
};

module.exports = {
  createServer,
};
