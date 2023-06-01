const validation = (text, toCase) => {
  const missingText = `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;
  const missingToCase = `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`;
  const unableToCase = `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`;

  const supportedMessage = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errorMessage = [];

  if (!text) {
    errorMessage.push({ message: missingText });
  }

  if (!toCase) {
    errorMessage.push({ message: missingToCase });
  }

  if (!!toCase && !supportedMessage.includes(toCase)) {
    errorMessage.push({ message: unableToCase });
  }

  return errorMessage;
}

const postMessageError = (response, statusCode, errorMessage) => {
  const errors = [];

  errorMessage.forEach(error => {
    errors.push(error);
  });
  response.statusCode = statusCode;
  response.end(JSON.stringify({ errors }));
}

module.exports = {
  postMessageError,
  validation,
}
