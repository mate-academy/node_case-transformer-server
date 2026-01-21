/* eslint-disable max-len */

const createErrorResponse = (errorMessages) => {
  return {
    errors: errorMessages.map(errorMessage => {
      return {
        message: errorMessage,
      };
    }),
  };
};

const createSuccessResponse = (originalCase, targetCase, originalText, convertedText) => {
  return {
    originalCase,
    targetCase,
    originalText,
    convertedText,
  };
};

module.exports = {
  createErrorResponse,
  createSuccessResponse,
};
