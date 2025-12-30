const { convertToCase } = require('./convertToCase/convertToCase');

const prepareResponseBody = (originalText, targetCase) => {
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

module.exports = {
  prepareResponseBody,
};
