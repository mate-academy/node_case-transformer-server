const {
  SUPPORTED_CASES,
  errorMessages,
} = require('./variables');

const validateData = (type, text) => {
  const errors = [];

  if (!text) {
    errors.push({
      message: errorMessages.NoOriginalText,
    });
  }

  if (!type) {
    errors.push({
      message: errorMessages.NoFormattingType,
    });
  }

  if (type && !SUPPORTED_CASES.includes(type)) {
    errors.push({
      message: errorMessages.WrongFormattingType,
    });
  }

  return errors;
};

module.exports = {
  validateData,
};
