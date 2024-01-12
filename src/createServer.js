/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const typeOfCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const messages = {
  putText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  insertQueryParam: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  notCorrectCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const PORT = process.env.PORT || 4000;

const createServer = () => {
  const server = http.createServer((req, res) => {
    const newUrl = new URL(req.url, `http://localhost:${PORT}`);
    const originalText = newUrl.pathname.slice(1);
    const targetCase = newUrl.searchParams.get('toCase');
    const errorsArray = [];

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    if (!originalText) {
      errorsArray.push({
        message: messages.putText,
      });
    }

    if (!targetCase) {
      errorsArray.push({
        message: messages.insertQueryParam,
      });
    } else if (!typeOfCases.includes(targetCase)) {
      errorsArray.push({
        message: messages.notCorrectCase,
      });
    }

    if (errorsArray.length) {
      res.statusCode = 400;

      res.write(JSON.stringify({
        errors: errorsArray,
      }));

      res.end();

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText, targetCase,
    );

    res.write(JSON.stringify({
      originalText,
      originalCase,
      targetCase,
      convertedText,
    }));

    res.end();
  });

  return server;
};

module.exports = {
  createServer,
};
