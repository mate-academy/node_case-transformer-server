const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const { errorMessages } = require('./errorMassages');
const validate = (text, toCase) => {
  const errors = [];

  if (!text) {
    errors.push({ message: errorMessages.emptyTextMessage });
  }

  if (!toCase) {
    errors.push({ message: errorMessages.emptyCaseMessage });
  }

  if (toCase && !validCases.includes(toCase)) {
    errors.push({ message: errorMessages.invalidCaseMassage });
  }

  return errors;
};

module.exports = { validate };
