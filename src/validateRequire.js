const { errorMessages, supportedCases } = require('./handleErrors');

const validateRequire = (text, caseName) => {
  const errors = [];

  const addErrorMessage = (message) => {
    errors.push({
      message,
    });
  };

  if (!text) {
    addErrorMessage(errorMessages.textError);
  }

  if (!caseName) {
    addErrorMessage(errorMessages.caseError);
  }

  if (caseName && !supportedCases.includes(caseName)) {
    addErrorMessage(errorMessages.caseValidationError);
  }

  return errors;
};

module.exports = {
  validateRequire,
};
