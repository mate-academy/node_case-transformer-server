const { errorMessages, supportedCases } = require('./handleErrors');

const validateRequire = (text, caseName) => {
  const errors = [];

  const addErrorMessage = (message) => {
    errors.push({
      message,
    });
  };

  const { textError, caseError, caseValidationError } = errorMessages;

  if (!text) {
    addErrorMessage(textError);
  }

  if (!caseName) {
    addErrorMessage(caseError);
  }

  if (caseName && !supportedCases.includes(caseName)) {
    addErrorMessage(caseValidationError);
  }

  return errors;
};

module.exports = {
  validateRequire,
};
