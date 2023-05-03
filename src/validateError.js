const errorTextEndpoint = 'Correct request is: '
  + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const errorMessage = {
  textIsMissing: {
    message: 'Text to convert is required. ' + errorTextEndpoint,
  },
  caseIsMissing: {
    message: '"toCase" query param is required. ' + errorTextEndpoint,
  },
  unknownCase: {
    message: 'This case is not supported. '
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  },
};

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const validateError = (originalText, targetCase) => {
  const errorList = [];

  if (!originalText) {
    errorList.push(errorMessage.textIsMissing);
  }

  if (!targetCase) {
    errorList.push(errorMessage.caseIsMissing);
  }

  if (targetCase && !cases.includes(targetCase)) {
    errorList.push(errorMessage.unknownCase);
  }

  return errorList;
};

module.exports = {
  validateError,
};
