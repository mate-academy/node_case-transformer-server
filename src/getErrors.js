const { validateCase } = require('./validateCase');
const { TEXT_REQUIRED, CASE_REQUIRED, INVALID_CASE } = require('./variables');

function getErrors(text, caseName) {
  const errors = [];

  if (!text) {
    errors.push(TEXT_REQUIRED);
  }

  if (!caseName) {
    errors.push(CASE_REQUIRED);
  }

  if (caseName && !validateCase(caseName)) {
    errors.push(INVALID_CASE);
  }

  return errors;
}

module.exports = {
  getErrors,
};
