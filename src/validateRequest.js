const {
  SUPPORTED_CASES,
  CASE_NOT_SUPPORTED,
  TEXT_TO_CONVERT_MESSAGE,
  QUERY_PARAM_IS_REQUIRED_MESSAGE,
} = require('./constants');

function validateRequest(textToConvert, targetCase) {
  const errors = [];

  if (!textToConvert) {
    errors.push({
      message: TEXT_TO_CONVERT_MESSAGE,
    });
  }

  if (!targetCase) {
    errors.push({
      message: QUERY_PARAM_IS_REQUIRED_MESSAGE,
    });
  } else if (!SUPPORTED_CASES.includes(targetCase)) {
    errors.push({
      message: CASE_NOT_SUPPORTED,
    });
  }

  return errors;
}

module.exports = {
  validateRequest,
};
