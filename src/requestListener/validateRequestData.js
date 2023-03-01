const {
  ERROR_MESSAGES,
  VALID_CASES: cases,
} = require('./validator.constants');

const isValidCase = caseToValidate => (
  cases.some(c => c === caseToValidate)
);

const validateRequestData = ({ originalText, targetCase }) => {
  const errors = [];

  if (!originalText) {
    errors.push({ message: ERROR_MESSAGES.ENOTEXT });
  }

  if (!targetCase) {
    errors.push({ message: ERROR_MESSAGES.ENOCASE });
  } else if (!isValidCase(targetCase)) {
    errors.push({ message: ERROR_MESSAGES.EIVCASE });
  }

  return errors;
};

module.exports = { validateRequestData };
