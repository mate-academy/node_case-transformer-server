const correctRequestMessage = 'Correct request is: '
+ '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessages = {
  textRequired: {
    message: 'Text to convert is required. ' + correctRequestMessage,
  },
  toCaseRequired: {
    message: '"toCase" query param is required. ' + correctRequestMessage,
  },
  unknownCase: {
    message: 'This case is not supported. '
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  },
};

const checkErrors = (text, caseName) => {
  const errors = [];

  if (!text) {
    errors.push(errorMessages.textRequired);
  }

  if (!caseName) {
    errors.push(errorMessages.toCaseRequired);
  }

  if (caseName && !cases.includes(caseName)) {
    errors.push(errorMessages.unknownCase);
  }

  return errors;
};

module.exports = { checkErrors };
