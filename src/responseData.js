const { convertToCase } = require('./convertToCase/convertToCase');

function responseData(textToConvert, toCase) {
  const result = convertToCase(textToConvert, toCase);

  const responceObject = {
    originalCase: result.originalCase,
    targetCase: toCase,
    originalText: textToConvert,
    convertedText: result.convertedText,
  };

  return responceObject;
}

module.exports = { responseData };
