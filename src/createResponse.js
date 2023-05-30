const { convertToCase } = require('./convertToCase/convertToCase');

function createResponse(text, toCase) {
  const convertResult = convertToCase(text, toCase);

  return {
    originalCase: convertResult.originalCase,
    targetCase: toCase,
    originalText: text,
    convertedText: convertResult.convertedText,
  };
}

module.exports = { createResponse };
