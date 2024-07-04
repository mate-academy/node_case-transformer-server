const { ERROR_MESSAGE, POSSIBLE_CASES } = require('./variables');

module.exports.validateUserData = (text, targetCase) => {
  const errors = [];

  if (!text) {
    errors.push({ message: ERROR_MESSAGE.TEXT_REQUIRED });
  }

  if (!targetCase) {
    errors.push({ message: ERROR_MESSAGE.CASE_REQUIRED });
  } else if (!POSSIBLE_CASES.includes(targetCase)) {
    errors.push({ message: ERROR_MESSAGE.INVALID_CASE });
  }

  return errors;
};
