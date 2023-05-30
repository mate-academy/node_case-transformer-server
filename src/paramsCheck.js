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

module.exports = paramsCheck;
