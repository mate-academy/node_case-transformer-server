const { errorMessages, validCases } = require('./errorMessages');

const handleErrors = (originalText, toCase) => {
  const errors = [];

  if (!originalText) {
    errors.push({
      message: errorMessages.missingText,
    });
  };

  if (!toCase) {
    errors.push({
      message: errorMessages.missingToCase,
    });
  };

  if (!validCases.includes(toCase) && toCase) {
    errors.push({
      message: errorMessages.invalidCase,
    });
  };

  return { errors };
};

module.exports = { handleErrors };
