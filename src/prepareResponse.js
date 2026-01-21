const { convertToCase } = require('./convertToCase/convertToCase');

const prepareResponse = (originalText, targetCase) => {
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
};

module.exports = { prepareResponse };
