const { errorMessages } = require('./errorMessages');
const { validCases } = require('./validCases');

const validateData = (textToValidate, toCase) => {
  const { noText, noToCase, notValidCase } = errorMessages;

  const errors = [];

  if (!textToValidate) {
    errors.push({ message: noText });
  }

  if (!toCase) {
    errors.push({ message: noToCase });
  }

  if (toCase && !validCases.includes(toCase)) {
    errors.push({ message: notValidCase });
  }

  return errors;
};

module.exports = { validateData };
