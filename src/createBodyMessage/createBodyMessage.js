const { createResponse } = require('./createResponse');
const caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const correctRequest = '/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>';
const missingText = `Text to convert is required. Correct request is: "${correctRequest}".`;
const missingToCase = `"toCase" query param is required. Correct request is: "${correctRequest}".`;
const notFromList = `This case is not supported. Available cases: ${caseTypes.join(', ')}.`;

function createErrorMessage(receivedText, receivedCase, res) {
  res.statusCode = 400;

  const errorMessage = {
    errors: [
    ],
  };

  if (!caseTypes.includes(receivedCase) && receivedCase) {
    errorMessage.errors.push({ message: notFromList });
  }

  if (!receivedCase) {
    errorMessage.errors.push({ message: missingToCase });
  }

  if (!receivedText) {
    errorMessage.errors.push({ message: missingText });
  };

  return errorMessage;
}

function createBodyMessage(receivedText, receivedCase, res) {
  const errorData = createErrorMessage(receivedText,
    receivedCase, res);

  if (errorData.errors.length) {
    return JSON.stringify(errorData);
  }

  return JSON.stringify(createResponse(receivedText,
    receivedCase, res));
}

module.exports = { createBodyMessage };
