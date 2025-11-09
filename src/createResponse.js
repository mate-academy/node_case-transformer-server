const { convertToCase } = require('./convertToCase');

const createResponse = ({ wordsToConvert, toCase, errors }) => {
  if (errors) {
    return JSON.stringify({
      errors: errors.map((error) => ({
        message: error,
      })),
    });
  }

  const { originalCase, convertedText } = convertToCase(wordsToConvert, toCase);

  return JSON.stringify({
    originalCase,
    targetCase: toCase,
    originalText: wordsToConvert,
    convertedText,
  });
};

module.exports = {
  createResponse,
};
