const { CASES_TO_CONVERT, MESSAGES } = require('./utils/constants');

const validateParams = (textToConvert, toCase) => {
  const errors = [];

  if (!textToConvert) {
    errors.push(MESSAGES.no_text);
  }

  if (!toCase) {
    errors.push(MESSAGES.no_case);
  }

  if (toCase && !CASES_TO_CONVERT.includes(toCase)) {
    errors.push(MESSAGES.case_not_supported);
  }

  return errors;
};

module.exports = {
  validateParams,
};
