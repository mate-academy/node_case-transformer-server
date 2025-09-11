const { convertToCase } = require('./convertToCase');

function getResult(text, toCase) {
  const result = {};
  const { originalCase, convertedText } = convertToCase(text, toCase);

  result.originalCase = originalCase;
  result.targetCase = toCase;
  result.originalText = text;
  result.convertedText = convertedText;

  return result;
}

module.exports = {
  getResult,
};
