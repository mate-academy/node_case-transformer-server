const { errorMessages } = require('./errorMessages');
const { validCases } = require('./validCases');

const inputValidation = (text, caseName) => {
  const errors = [];

  if (text.length === 0) {
    errors.push({ message: errorMessages.emptyText });
  }

  if (!caseName) {
    errors.push({ message: errorMessages.emptyCase });
  }

  if (caseName && !validCases.includes(caseName)) {
    errors.push({ message: errorMessages.invalidCase });
  }

  return errors;
};

module.exports = {
  inputValidation,
};
