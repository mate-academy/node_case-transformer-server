const { convertToCase } = require('../convertToCase');

function parseInputs(textToConvert, toCase) {
  const output = {};
  const { originalCase, convertedText } = convertToCase(textToConvert, toCase);

  output.originalCase = originalCase;
  output.targetCase = toCase;
  output.originalText = textToConvert;
  output.convertedText = convertedText;

  return output;
}

module.exports = {
  parseInputs,
};
