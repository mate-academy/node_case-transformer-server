// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const fullUrl = new URL(req.url, `http://${req.headers.host}`);

    res.setHeader('Content-type', 'application/json');

    const text = fullUrl.pathname.slice(1);
    const convertTo = fullUrl.searchParams.get('toCase');

    const errors = [];

    if (text.length === 0) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!convertTo) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    } else if (!availableCases.includes(convertTo)) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      const errorResponseBody = {
        errors,
      };

      res.end(JSON.stringify(errorResponseBody));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const { originalCase, convertedText } = convertToCase(text, convertTo);

    const responseBody = {
      convertedText,
      originalCase,
      originalText: text,
      targetCase: convertTo,
    };

    res.end(JSON.stringify(responseBody));
  });
};

module.exports = {
  createServer,
};
