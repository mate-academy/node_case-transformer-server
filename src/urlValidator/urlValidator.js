const errorMessages = {
  textMissing: {
    message: 'Text to convert is required. Correct request is: '
         + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  toCaseMissing: {
    message: '"toCase" query param is required. '
         + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  unknownCase: {
    message: 'This case is not supported. '
         + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  },
};

const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const urlValidator = (text, toCase) => {
  const errors = [];

  if (!text) {
    errors.push(errorMessages.textMissing);
  }

  if (!toCase) {
    errors.push(errorMessages.toCaseMissing);
  }

  if (toCase && !allowedCases.includes(toCase)) {
    errors.push(errorMessages.unknownCase);
  }

  return errors;
};

module.exports = { urlValidator };
