const correctRequestMessage = 'Correct request is: '
+ '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const errorMessages = {
  textReq: {
    message: 'Text to convert is required. ' + correctRequestMessage,
  },
  toCaseReq: {
    message: '"toCase" query param is required. ' + correctRequestMessage,
  },
  unknownCase: {
    message: 'This case is not supported. '
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  },
};

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const checkErrors = (originalText, targetCase) => {
  const errors = [];

  if (!originalText) {
    errors.push(errorMessages.textReq);
  }

  if (!targetCase) {
    errors.push(errorMessages.toCaseReq);
  }

  if (targetCase && !cases.includes(targetCase)) {
    errors.push(errorMessages.unknownCase);
  }

  return errors;
};

module.exports = { checkErrors };
