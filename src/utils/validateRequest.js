const { ERRORS, CASES } = require('../constants/constants.js');

const validateRequest = (text, toCase) => {
  const errors = [];

  if (!text) {
    errors.push({
      message: ERRORS.MISSING_TEXT,
    });
  }

  if (!toCase) {
    errors.push({
      message: ERRORS.MISSING_CASE,
    });
  }

  if (toCase && !CASES.includes(toCase)) {
    errors.push({
      message: ERRORS.INVALID_CASE,
    });
  }

  return errors;
};

module.exports = { validateRequest };
