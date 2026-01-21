/* eslint-disable max-len */

const validateParams = (text, toCase) => {
  const emptyTextMessage = 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const emptyCaseMessage = '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
  const invalidCaseMessage = 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

  const errorMessages = [];
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!toCase) {
    errorMessages.push({ message: emptyCaseMessage });
  }

  if (!text) {
    errorMessages.push({ message: emptyTextMessage });
  }

  if (!!toCase && !supportedCases.includes(toCase)) {
    errorMessages.push({ message: invalidCaseMessage });
  }

  return errorMessages;
};

const sendError = (response, statusCode, errorMessages) => {
  const errors = [];

  errorMessages.forEach(error => {
    errors.push(error);
  });
  response.statusCode = statusCode;
  response.end(JSON.stringify({ errors }));
};

module.exports = {
  sendError,
  validateParams,
};
