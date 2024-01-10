const { convertToCase } = require('../convertToCase/convertToCase');

function createResponse(recievedText, recivedCase, res) {
  res.statusCode = 200;

  const convertedResult = convertToCase(recievedText, recivedCase);
  const { originalCase, convertedText } = convertedResult;
  const result = {
    originalCase,
    targetCase: recivedCase,
    originalText: recievedText,
    convertedText,
  };

  return result;
}

module.exports = { createResponse };
