/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/');

const caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

// enum caseTypes{
//   SNAKE,
//   KEBAB,
//   CAMEL,
//   PASCAL,
//   UPPER,
// }

const createServer = () => {
  return http.createServer((req, res) => {
    const [text, queryString] = req.url.slice(1).split('?');

    const caseType = new URLSearchParams(queryString).get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    if (!text) {
      const errorMessage = {
        // eslint-disable-next-line max-len
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      };

      errors.push(errorMessage);
    }

    if (!caseType) {
      const errorMessage = {
        // eslint-disable-next-line max-len
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      };

      errors.push(errorMessage);
    }

    if (caseType && !caseTypes.includes(caseType)) {
      const errorMessage = {
        // eslint-disable-next-line max-len
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      };

      errors.push(errorMessage);
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    res.statusCode = 200;
    res.statusText = 'OK';

    const { originalCase, convertedText } = convertToCase(text, caseType);

    res.end(JSON.stringify(
      {
        originalCase,
        targetCase: caseType,
        originalText: text,
        convertedText,
      },
    ));
  });
};

module.exports = {
  createServer,
};
