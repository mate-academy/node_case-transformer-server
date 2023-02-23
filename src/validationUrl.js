const { errorMessages } = require('./errorMessages');

const validationUrl = (originalText, toCase) => {
  const errors = [];
  const possibleCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!originalText) {
    errors.push({ message: errorMessages.textMissing });
  }

  if (!toCase) {
    errors.push({ message: errorMessages.toCaseMissing });
  }

  if (toCase && !possibleCases.includes(toCase)) {
    errors.push({ message: errorMessages.anotherCase });
  }

  return errors;
};

module.exports = {
  validationUrl,
};
