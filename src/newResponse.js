const convertToCase = require('./convertToCase/convertToCase');

function newResponse(inputText, toCase) {
  return {
    ...convertToCase(inputText, toCase),
    targetCase: toCase,
    originalText: inputText,
  };
}

module.exports = newResponse;