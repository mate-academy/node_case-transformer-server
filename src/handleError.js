const { errorMessages, availableCases } = require('./errorConsts');

const handleErrors = (baseText, toCase) => {
  const errors = [];

  if (!baseText) {
    errors.push({
      message: errorMessages.emptyText,
    });
  }

  if (!toCase) {
    errors.push({
      message: errorMessages.emptyCase,
    });
  }

  if (toCase && !availableCases.includes(toCase)) {
    errors.push({
      message: errorMessages.nonExistCase,
    });
  }

  return errors;
};

module.exports = {
  handleErrors,
};
