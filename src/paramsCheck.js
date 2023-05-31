/* eslint-disable max-len */
const paramsCheck = (text, toCase) => {
  const errorMessages = {
    emptyTextMessage: { message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
    emptyCaseMessage: { message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
    invalidCaseMessage: { message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' },
  };

  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
  const errors = [];

  if (!toCase) {
    errors.push(errorMessages.emptyCaseMessage);
  }

  if (!text) {
    errors.push(errorMessages.emptyTextMessage);
  }

  if (!!toCase && !supportedCases.includes(toCase)) {
    errors.push(errorMessages.invalidCaseMessage);
  }

  return errors;
};

module.exports = paramsCheck;
