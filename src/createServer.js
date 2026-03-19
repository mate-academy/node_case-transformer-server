/* eslint-disable max-len */
const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');

const TYPE_CASE = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const MISSING_TEXT_ERROR =
  'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const MISSING_CASE_ERROR =
  '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const UNSUPPORTED_CASE_ERROR =
  'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function createServer() {
  return http.createServer((request, response) => {
    const [path, queryString] = request.url.slice(1).split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    response.setHeader('Content-type', 'application/json');

    const errors = [];

    if (path === '') {
      errors.push({
        message: MISSING_TEXT_ERROR,
      });
    }

    if (toCase === null) {
      errors.push({
        message: MISSING_CASE_ERROR,
      });
    } else if (!TYPE_CASE.includes(toCase)) {
      errors.push({
        message: UNSUPPORTED_CASE_ERROR,
      });
    }

    if (errors.length !== 0) {
      const errorsMessage = {
        errors: errors,
      };

      response.statusCode = 400;
      response.statusMessage = 'Bad request';

      return response.end(JSON.stringify(errorsMessage));
    }

    const result = convertToCase(path, toCase);

    response.statusCode = 200;
    response.statusMessage = 'OK';

    const resultMessage = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: path,
      convertedText: result.convertedText,
    };

    response.end(JSON.stringify(resultMessage));
  });
}

module.exports = {
  createServer,
};
