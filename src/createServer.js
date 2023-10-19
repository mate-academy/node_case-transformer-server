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

    const searchParams = new URLSearchParams(request.url.slice(1).split('?')[1]);
    const toCase = searchParams.get('toCase');

    const errors = checkValidation(request.url.slice(1).split('?')[0], toCase);

    if (errors.length) {
      response.statusCode = 400;
      response.statusMessage = 'Bad Request';
      response.end(JSON.stringify({ errors }));
    } else {
      response.statusCode = 200;
      response.statusMessage = 'OK';

      const result = convertToCase(request.url.slice(1).split('?')[0], toCase);

      result.targetCase = toCase;
      result.originalText = request.url.slice(1).split('?')[0];

      response.end(JSON.stringify(result));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
