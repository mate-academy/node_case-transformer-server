const { convertToCase } = require('./convertToCase');
const { constants } = require('./constants');

function validateData(params, originalText) {
  const errors = [];

  const targetCase = params.get('toCase');

  if (!originalText) {
    errors.push({
      message: 'Text to convert is required. Correct request is:'
       + constants.CORRECT_REQUEST,
    });
  }

  if (!targetCase) {
    errors.push({
      message: '"toCase" query param is required. Correct request is:'
       + constants.CORRECT_REQUEST,
    });
  }

  if (targetCase) {
    try {
      convertToCase(originalText, targetCase);
    } catch (err) {
      errors.push({
        message:
          'This case is not supported. Available cases:'
          + constants.CORRECT_CASES,
      });
    }
  }

  return {
    errors,
    targetCase,
  };
}

module.exports = {
  validateData,
};
