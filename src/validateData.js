const { AVAILBLE_TRANSFORM, REQUIRED_MESSAGE } = require('./const');

function validateData(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
    errors.push({
      message: 'Text to convert is required. ' + REQUIRED_MESSAGE,
    });
  }

  if (!targetCase) {
    errors.push({
      message: '"toCase" query param is required. ' + REQUIRED_MESSAGE,
    });
  }

  if (targetCase
    && !AVAILBLE_TRANSFORM.includes(targetCase)) {
    errors.push({
      message: `This case is not supported. Available cases: ${AVAILBLE_TRANSFORM.join(', ')}.`,
    });
  }

  return errors;
}

module.exports = {
  validateData,
};
