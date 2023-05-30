const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const { pathname, searchParams } = new URL(request.url, `http://${request.headers.host}`);
    const text = pathname.slice(1);
    const toCase = searchParams.get('toCase');

    const errorMessages = paramsCheck(text, toCase);

    if (errorMessages.length) {
      return sendError(response, 400, errorMessages);
    }

    const {
      convertedText,
      originalCase,
    } = convertToCase(text, toCase);

    const responseBody = {
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    };

    response.statusCode = 200;
    response.end(JSON.stringify(responseBody));
  });

  return server;
};

const paramsCheck = (text, toCase) => {
  const emptyTextMessage = 'Text to convert is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const emptyCaseMessage = '"toCase" query param is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const invalidCaseMessage = 'This case is not supported.'
    + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

  const errorMessages = [];
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!toCase) {
    errorMessages.push(emptyCaseMessage);
  }

  if (!text) {
    errorMessages.push(emptyTextMessage);
  }

  if (!!toCase && !supportedCases.includes(toCase)) {
    errorMessages.push(invalidCaseMessage);
  }

  return errorMessages;
};

const sendError = (response, statusCode, errorMessages) => {
  const errors = [];

  errorMessages.forEach(error => {
    errors.push({ message: error });
  });
  response.statusCode = statusCode;
  response.end(JSON.stringify({ errors }));
};

createServer();

module.exports.createServer = createServer;
