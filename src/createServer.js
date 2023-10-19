/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const caseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const ERROR_MESSAGES = {
  NO_ORIGIN_STRING: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_QUERY_CASE: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_SUPPORTED_CASE: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const checkValidation = (textToTransform, toCase) => {
  const errors = [];

  if (!textToTransform) {
    errors.push({ message: ERROR_MESSAGES.NO_ORIGIN_STRING });
  }

  if (!toCase) {
    errors.push({ message: ERROR_MESSAGES.NO_QUERY_CASE });
  }

  if (toCase && !caseNames.includes(toCase)) {
    errors.push({ message: ERROR_MESSAGES.NO_SUPPORTED_CASE });
  }

  return errors;
};

const createServer = () => {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-type', 'application/json');

    const [originString, queryCase] = request.url.slice(1).split('?');
    const searchParams = new URLSearchParams(queryCase);
    const toCase = searchParams.get('toCase');

    const errors = checkValidation(originString, toCase);

    if (errors.length) {
      response.statusCode = 400;
      response.statusMessage = 'Bad Request';
      response.end(JSON.stringify({ errors }));
    } else {
      response.statusCode = 200;
      response.statusMessage = 'OK';

      const result = convertToCase(originString, toCase);

      result.targetCase = toCase;
      result.originalText = originString;

      response.end(JSON.stringify(result));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
