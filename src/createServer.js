const http = require('http');
const url = require('url');

const { detectCase } = require('./convertToCase/detectCase');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const responseData = {};

    responseData.errors = [];

    const normalizedURL = new url.URL(
      request.url,
      `http://${request.headers.host}`,
    );

    const searchParams = normalizedURL.searchParams;

    const textToConvert = normalizedURL.pathname.slice(1);
    const targetCase = searchParams.get('toCase');

    if (!textToConvert.length) {
      responseData.errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!searchParams.has('toCase')) {
      responseData.errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    } else if (targetCase === null || !supportedCases.includes(targetCase)) {
      responseData.errors.push({
        message: `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
      });
    }

    if (!responseData.errors.length) {
      delete responseData.errors;

      responseData.originalCase = detectCase(textToConvert);

      responseData.targetCase = targetCase;

      responseData.originalText = textToConvert;

      responseData.convertedText = convertToCase(
        textToConvert,
        targetCase,
      ).convertedText;

      response.statusCode = 200;
      response.statusMessage = 'OK';
    } else {
      response.statusCode = 400;
      response.statusMessage = 'Bad request';
    }

    response.end(JSON.stringify(responseData));
  });

  server.on('error', (error) => {
    // eslint-disable-next-line no-console
    console.log(error.message);
  });

  return server;
};

module.exports = {
  createServer,
};
