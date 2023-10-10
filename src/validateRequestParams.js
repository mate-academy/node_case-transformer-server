const { supportedCases, errorMessages } = require('./constants');

function validateRequestParams(params) {
  const { originalText, targetCase } = params;
  const errors = [];

  if (!originalText) {
    errors.push({
      message: errorMessages.noText,
    });
  }

  if (!targetCase) {
    errors.push({
      message: errorMessages.noCase,
    });
  }

  if (targetCase && !supportedCases.includes(targetCase)) {
    errors.push({
      message: errorMessages.unsupportedCase,
    });
  }

  return { errors };
}

module.exports = { validateRequestParams };
