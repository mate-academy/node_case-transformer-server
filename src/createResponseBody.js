const { convertToCase } = require('./convertToCase/index');

function createResponseBody(text, targetCase) {
  const result = convertToCase(text, targetCase);

  const responseBody = {
    originalCase: result.originalCase,
    targetCase,
    originalText: text,
    convertedText: result.convertedText,
  };

  return responseBody;
}

module.exports = {
  createResponseBody,
};
