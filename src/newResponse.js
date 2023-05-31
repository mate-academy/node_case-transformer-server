const { convertToCase } = require('./convertToCase');

function newResponse(textToConvert, toCase) {
  return {
    ...convertToCase(textToConvert, toCase),
    targetCase: toCase,
    originalText: textToConvert,
  };
}

module.exports = newResponse;
