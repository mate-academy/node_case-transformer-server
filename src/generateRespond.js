const { convertToCase } = require('./convertToCase');

function generateRespond(originalText, targetCase) {
  const {
    originalCase,
    convertedText,
  } = convertToCase(originalText, targetCase);

  return {
    originalCase,
    targetCase,
    originalText,
    convertedText,
  };
}

module.exports = { generateRespond };
