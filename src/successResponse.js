const createSuccessResponse = (convertData, toCase, textToConvert) => {
  return {
    originalCase: convertData.originalCase,
    targetCase: toCase,
    originalText: textToConvert,
    convertedText: convertData.convertedText,
  };
};

module.exports = { createSuccessResponse };
