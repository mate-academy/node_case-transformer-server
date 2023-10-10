const { errorMessages } = require('./errorMessages');

const VALID_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validate(text, toCase) {
  const errors = [];

  if (!toCase) {
    errors.push({ message: errorMessages.NO_CASE });
  }

  if (!text) {
    errors.push({ message: errorMessages.NO_TEXT });
  }

  if (toCase && !VALID_CASES.includes(toCase)) {
    errors.push({ message: errorMessages.NOT_VALID_CASE });
  }

  return errors;
}

module.exports = { validate };
