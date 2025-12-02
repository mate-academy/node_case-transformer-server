const { convertToCase } = require('./convertToCase');

const responseData = (textToConvert, toCase) => {
  const result = convertToCase(textToConvert, toCase);

  const response = {
    originalCase: result.originalCase,
    targetCase: toCase,
    originalText: textToConvert,
    convertedText: result.convertedText,
  };

  return response;
};

module.exports = { responseData };
