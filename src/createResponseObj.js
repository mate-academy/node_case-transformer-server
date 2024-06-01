const getErrors = require('./getErrors').getErrors;
const convertToCase = require('./convertToCase').convertToCase;

function createResponseObj(textToConvert, caseName) {
  const errors = getErrors(textToConvert, caseName);

  if (errors.length !== 0) {
    return { errors };
  }

  const response = convertToCase(textToConvert, caseName);

  response.targetCase = caseName;
  response.originalText = textToConvert;

  return response;
}

module.exports = { createResponseObj };
