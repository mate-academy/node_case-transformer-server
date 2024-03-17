const { convertToCase } = require('../convertToCase/convertToCase');

function composeResponse(originalText, targetCase) {
  const { originalCase, convertedText } = convertToCase(
    originalText,
    targetCase,
  );

  const result = JSON.stringify({
    originalCase,
    targetCase,
    originalText,
    convertedText,
  });

  return result;
}

module.exports = composeResponse;
