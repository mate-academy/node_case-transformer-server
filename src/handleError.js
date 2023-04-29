const { errorMessages, allCases } = require('./errorMessages');

const handleErrorMessage = (textToConvert, toCase) => {
  const errors = [];

  if (!textToConvert) {
    errors.push({
      message: errorMessages.emptyText,
    });
  }

  if (!toCase) {
    errors.push({
      message: errorMessages.emptyCase,
    });
  }

  if (toCase && !allCases.includes(toCase)) {
    errors.push({
      message: errorMessages.notExistCase,
    });
  }

  return errors;
};

module.exports = {
  handleErrorMessage,
};
