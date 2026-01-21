/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost:5700');
    const caseParam = url.searchParams.get('toCase');
    const errors = [];

    response.setHeader('Content-Type', 'application/json');

    if (!url.pathname || url.pathname === '/') {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!caseParam) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (caseParam && !allowedCases.includes(caseParam.toUpperCase())) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      response.statusCode = 400;

      response.end(
        JSON.stringify({
          errors,
        }),
      );

      return;
    }

    const textToConvert = url.pathname.trim().slice(1);
    const targetCase = caseParam.toUpperCase();

    const convertedResult = convertToCase(textToConvert, targetCase);

    response.statusCode = 200;

    response.end(
      JSON.stringify({
        ...convertedResult,
        originalText: textToConvert,
        targetCase,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
