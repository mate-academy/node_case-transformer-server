const formatErrorResponse = (errors) => {
  return {
    errors,
  };
};

const formatSuccessResponse = (conversionResult, targetCase, originalText) => {
  return {
    originalCase: conversionResult.originalCase,
    targetCase,
    originalText,
    convertedText: conversionResult.convertedText,
  };
};

module.exports = {
  formatErrorResponse,
  formatSuccessResponse,
};
